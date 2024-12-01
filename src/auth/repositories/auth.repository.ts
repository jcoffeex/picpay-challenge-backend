import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { UserDto } from '../dto/UserDto';
@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async FindUserByEmail(emailDto: UserDto) {
    return await this.prismaService.user.findUnique({
      where: {
        email: emailDto.email,
      },
    });
  }

  async FindUserByCpf(cpfDto: UserDto) {
    return await this.prismaService.user.findUnique({
      where: {
        cpf: cpfDto.cpf,
      },
    });
  }

  async FindUserByCnpj(cnpjDto: UserDto) {
    if (!cnpjDto.cnpj) {
      return null;
    }
    return await this.prismaService.user.findUnique({
      where: {
        cnpj: cnpjDto.cnpj,
      },
    });
  }

  async createUser(createUserDto: UserDto) {
    const { userType, name, email, password, cpf, cnpj } = createUserDto;

    try {
      const user = await this.prismaService.user.create({
        data: {
          name,
          email,
          password,
          cpf,
          cnpj,
          userType,
        },
      });
      return {
        user,
        message: 'Usuário criado!',
      };
    } catch (error) {
      throw new Error('Erro ao criar o usuário: ' + error.message);
    }
  }
}
