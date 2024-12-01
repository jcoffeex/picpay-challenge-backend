import { Injectable } from '@nestjs/common';
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
    return await this.prismaService.wallet.update({
      where: {
        userId,
      },

      data: {
        balance: {
          increment: amount,
        },
      },
    });
  }
}
