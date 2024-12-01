import { Controller, Post } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
@UseGuards(AuthGuard)
@Controller('transaction')
export class TransactionController {
  @Post('wallet')
  async createWallet() {
    return 'Carteira criada.';
  }
}
