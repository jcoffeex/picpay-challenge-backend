import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { PrismaService } from './services/prisma.service';
import { AuthRepository } from './repositories/auth.repository';
import { UserService } from './services/auth.service';
import { JwtService } from '@nestjs/jwt';
@Module({
  controllers: [AuthController],
  providers: [PrismaService, UserService, JwtService, AuthRepository],
})
export class AuthModule {}
