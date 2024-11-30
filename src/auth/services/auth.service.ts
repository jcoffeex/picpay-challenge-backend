import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../repositories/auth.repository';
import { RegisterDto } from '../dto/RegisterDto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { hashPassword } from '../utils/crypto';
@Injectable()
export class UserService {
  constructor(private readonly authRepository: AuthRepository) {}

  async registerUser(registerDto: RegisterDto) {
    const EmailExists = await this.authRepository.FindUserByEmail(registerDto);
    const cpfExists = await this.authRepository.FindUserByCpf(registerDto);
    const cnpjExists = await this.authRepository.FindUserByCnpj(registerDto);

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
}
