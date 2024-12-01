import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthRepository } from './repositories/auth.repository';
import { UserService } from './services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/services/prisma.service';
@Module({
  controllers: [AuthController],
  providers: [UserService, JwtService, PrismaService, AuthRepository],
})
export class AuthModule {}
