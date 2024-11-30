import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { PrismaService } from './services/prisma.service';
import { AuthRepository } from './repositories/auth.repository';
import { UserService } from './services/auth.service';
@Module({
  controllers: [AuthController],
  providers: [PrismaService, UserService, AuthRepository],
})
export class AuthModule {}
