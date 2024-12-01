import { IsNumber } from 'class-validator';

export class DepositDto {
  @IsNumber({}, { message: 'A quantia deve ser um número.' })
  amount: number;
}
