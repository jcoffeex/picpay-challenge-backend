import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../repositories/auth.repository';
import { UserDto } from '../dto/UserDto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { hashPassword, comparePassword } from '../utils/crypto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(registerDto: UserDto) {
    const EmailExists = await this.authRepository.FindUserByEmail(registerDto);
    const cpfExists = await this.authRepository.FindUserByCpf(registerDto);
    const cnpjExists = await this.authRepository.FindUserByCnpj(
      registerDto.cnpj,
    );

    if (EmailExists) {
      throw new HttpException('Email já cadastrado.', HttpStatus.CONFLICT);
    }

    if (cpfExists) {
      throw new HttpException('CPF já cadastrado.', HttpStatus.CONFLICT);
    }

    if (cnpjExists) {
      throw new HttpException('CNPJ já cadastrado.', HttpStatus.CONFLICT);
    }

    const password = registerDto.password;
    const hash = await hashPassword(password);

    const updatedRegisterDto = {
      ...registerDto,
      password: hash,
    };
    const user = await this.authRepository.createUser(updatedRegisterDto);
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.authRepository.FindUserByEmail({
      email,
    } as UserDto);

    const payload = { email: user.email, id: user.id };
    if (!user) {
      throw new HttpException('Email não existe!', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('Senha incorreta.', HttpStatus.UNAUTHORIZED);
    }
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });
    return {
      message: 'Login realizado com sucesso!',
      user,
      token,
    };
  }
}
