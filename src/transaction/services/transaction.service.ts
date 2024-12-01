import { Injectable, ConflictException } from '@nestjs/common';
import { TransactionRepository } from '../repositories/transaction.repository';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}
  async createWallet(userId: string) {
    const existingWallet =
      await this.transactionRepository.existingWallet(userId);
    if (existingWallet) {
      throw new ConflictException('Uma carteira já existe para este usuário.');
    }

    return await this.transactionRepository.createWallet(userId);
  }

  async deposit(userId: string, amount: number) {
    return await this.transactionRepository.deposit(userId, amount);
  }
}
