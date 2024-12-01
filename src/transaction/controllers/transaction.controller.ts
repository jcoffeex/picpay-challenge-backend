import { Controller, Post, Req } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';

interface Req {
  user: {
    id: string;
    email: string;
  };
}

@UseGuards(AuthGuard)
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
  @Post('wallet')
  async createWallet(@Req() req: Req) {
    const walletCreated = await this.transactionService.createWallet(
      req.user.id,
    );
    return {
      message: 'Carteira criada!',
      walletCreated,
    };
  }
}
