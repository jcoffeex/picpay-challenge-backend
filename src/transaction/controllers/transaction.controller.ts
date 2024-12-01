import { Controller, Post, Req, Body } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { UserDto } from 'src/auth/dto/UserDto';

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
  async deposit(@Req() req: Request, @Body() body: UserDto) {
    const depositCreated = await this.transactionService.deposit(
      req.user.id,
      Number(body.amount),
    );

    return {
      message: 'Depósito efetuado!',
      depositCreated,
    };
  }
}
