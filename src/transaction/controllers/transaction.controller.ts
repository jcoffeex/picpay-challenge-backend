import { Controller, Post, Req, Body } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { DepositDto } from '../dto/DepositDto';

interface Request {
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
  async createWallet(@Req() req: Request) {
    try {
      const walletCreated = await this.transactionService.createWallet(
        req.user.id,
      );
      return {
        message: 'Carteira criada!',
        walletCreated,
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('deposit')
  async deposit(@Req() req: Request, @Body() body: DepositDto) {
    try {
      await this.transactionService.deposit(req.user.id, Number(body.amount));

      return {
        message: 'Depósito efetuado com sucesso!',
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
  @Post('transfer')
  async transfer(
    @Req() req: Request,
    @Body() body: { receiverId: string; amount: number },
  ) {
    try {
      await this.transactionService.transfer(
        req.user.id,
        body.receiverId,
        body.amount,
      );
      return {
        message: 'Transferência realizada com sucesso!',
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
