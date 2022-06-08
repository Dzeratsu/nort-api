import { IsNotEmpty, Max } from 'class-validator';
import { IProduct, IResult } from '../../schemas/order.schema';

export class orderDto {
  @IsNotEmpty()
  @Max(11)
  month: number;

  @IsNotEmpty()
  manager: string;

  email: string;

  id: number;

  phone: string;

  sity: string;

  status: number;

  product: [IProduct];

  result: [IResult];
}
