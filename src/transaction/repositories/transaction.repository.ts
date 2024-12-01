import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class TransactionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async existingWallet(userId: string) {
    return await this.prismaService.wallet.findUnique({
      where: {
        userId,
      },
    });
  }

  async createWallet(userId: string) {
    return await this.prismaService.wallet.create({
      data: {
        userId,
      },
    });
  }

  async deposit(userId: string, amount: number) {
    const updatedWallet = await this.prismaService.wallet.update({
      where: {
        userId,
      },
      data: {
        balance: {
          increment: amount,
        },
      },
    });

    const transaction = await this.prismaService.transaction.create({
      data: {
        amount,
        status: 'completed',
        senderWalletId: updatedWallet.id,
        receiverWalletId: updatedWallet.id,
      },
    });

    return { updatedWallet, transaction };
  }

  async transfer(senderId: string, receiverId: string, amount: number) {
    const senderWallet = await this.prismaService.wallet.findUnique({
      where: {
        userId: senderId,
      },
    });

    if (!senderWallet) {
      throw new NotFoundException('Carteira do remetente não encontrada.');
    }

    const receiverWallet = await this.prismaService.wallet.findUnique({
      where: {
        userId: receiverId,
      },
    });

    if (!receiverWallet) {
      throw new NotFoundException('Carteira do destinatário não encontrada.');
    }

    if (senderWallet.balance < amount) {
      throw new BadRequestException('Saldo insuficiente para a transferência.');
    }
    const updatedSenderWallet = await this.prismaService.wallet.update({
      where: {
        id: senderWallet.id,
      },
      data: {
        balance: {
          decrement: amount,
        },
      },
    });

    const updatedReceiverWallet = await this.prismaService.wallet.update({
      where: {
        id: receiverWallet.id,
      },
      data: {
        balance: {
          increment: amount,
        },
      },
    });

    const transaction = await this.prismaService.transaction.create({
      data: {
        amount,
        status: 'completed',
        senderWalletId: senderWallet.id,
        receiverWalletId: receiverWallet.id,
      },
    });
    return {
      updatedSenderWallet,
      updatedReceiverWallet,
      transaction,
    };
  }
}
