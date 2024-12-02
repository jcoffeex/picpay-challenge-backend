import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { TransactionRepository } from '../repositories/transaction.repository';
import { AuthRepository } from 'src/auth/repositories/auth.repository';
@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly authRepository: AuthRepository,
  ) {}
  async createWallet(userId: string) {
    const existingWallet =
      await this.transactionRepository.existingWallet(userId);
    if (existingWallet) {
      throw new ConflictException('Uma carteira já existe para este usuário.');
    }

    return await this.transactionRepository.createWallet(userId);
  }

  async deposit(userId: string, amount: number) {
    const result = await this.transactionRepository.deposit(userId, amount);
    return {
      wallet: result.updatedWallet,
      transaction: result.transaction,
    };
  }

  async transfer(senderId: string, receiverId: string, amount: number) {
    const authorizeTransaction = true;

    if (!authorizeTransaction) {
      throw new UnauthorizedException(
        'Transferência não autorizada pelo serviço externo.',
      );
    }

    const sender = await this.authRepository.FindUserById(senderId);

    if (!sender) {
      throw new ConflictException('Usuário remetente não encontrado.');
    }

    if (sender.cnpj) {
      throw new ConflictException('Lojistas não podem fazer transferências.');
    }

    const result = await this.transactionRepository.transfer(
      senderId,
      receiverId,
      amount,
    );
    return {
      senderWallet: result.updatedSenderWallet,
      receiverWallet: result.updatedReceiverWallet,
      transaction: result.transaction,
    };
  }
}
