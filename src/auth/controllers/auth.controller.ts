import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserDto } from '../dto/UserDto';
import { UserService } from '../services/auth.service';

interface Login {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}
  @UsePipes(ValidationPipe)
  @Post('register')
  async register(@Body() user: UserDto) {
    try {
      const result = await this.userService.registerUser(user);
      return {
        message: 'Usuário registrado com sucesso!',
        user: result,
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('login')
  async login(@Body() user: Login) {
    const { email, password } = user;
    try {
      const result = await this.userService.login(email, password);
      return {
        message: 'Usuário autenticado com sucesso!',
        user: result,
      };
    } catch (error) {
      throw error;
    }
  }
}
