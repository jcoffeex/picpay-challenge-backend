import { Module } from '@nestjs/common';
import { TransactionController } from './controllers/transaction.controller';
import { TransactionRepository } from './repositories/transaction.repository';
import { TransactionService } from './services/transaction.service';
import { PrismaService } from 'src/services/prisma.service';
import { AuthRepository } from 'src/auth/repositories/auth.repository';
@Module({
  controllers: [TransactionController],
  providers: [
    TransactionRepository,
    TransactionService,
    PrismaService,
    AuthRepository,
  ],
})
export class TransactionModule {}
