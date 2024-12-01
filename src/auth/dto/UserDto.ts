import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';
import { IsCpf, IsCnpj } from '../utils/validations';
export class UserDto {
  userType?: string;

  @IsString({ message: 'O nome deve ser uma string!' })
  name: string;

  @IsEmail({}, { message: 'Não é um email válido!' })
  email: string;

  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres.' })
  password: string;

  @IsCpf({ message: 'Não é um cpf válido!' })
  cpf: string;

  @IsOptional()
  @IsCnpj({ message: 'Não é um cnpj válido!' })
  cnpj?: string;

  amount?: number;
}
