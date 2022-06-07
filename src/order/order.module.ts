import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../schemas/order';
import { OrderService } from './order.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  providers: [OrderService],
  exports: [OrderService],
  controllers: [OrderModule],
})
export class OrderModule {}
