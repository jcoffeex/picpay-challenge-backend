import { Module } from '@nestjs/common';
import { TransactionController } from './controllers/transaction.controller';
import { TransactionRepository } from './repositories/transaction.repository';
import { TransactionService } from './services/transaction.service';
import { PrismaService } from 'src/services/prisma.service';
@Module({
  controllers: [TransactionController],
  providers: [TransactionRepository, TransactionService, PrismaService],
})
export class TransactionModule {}
