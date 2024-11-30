import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterDto } from '../dto/RegisterDto';
import { UserService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}
  @UsePipes(ValidationPipe)
  @Post('register')
  async register(@Body() user: RegisterDto) {
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
}
