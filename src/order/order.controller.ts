import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Param,
  Req,
} from '@nestjs/common';
import { orderDto } from './dto/orderDto';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly OrderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/all/:id')
  loadOrderMonth(@Param() param, @Req() req) {
    return this.OrderService.allMonth(req.user, param.id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/add')
  addOrder(@Body() orderDto: orderDto) {
    return this.OrderService.newOrder(orderDto);
  }
}
