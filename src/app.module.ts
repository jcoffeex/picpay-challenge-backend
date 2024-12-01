import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transaction/transaction.module';
import { PrismaService } from './services/prisma.service';
@Module({
  imports: [AuthModule, TransactionModule],
  providers: [PrismaService],
})
export class AppModule {}
