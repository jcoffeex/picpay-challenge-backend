import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../repositories/transaction.repository';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async createWallet(userId: string) {
    const wallet = await this.transactionRepository.createWallet(userId);
    return wallet;
  }
}
