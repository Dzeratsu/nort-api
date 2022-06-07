import { Controller, Post } from "@nestjs/common";

@Controller('order')
export class OrderController {
  constructor(private readonly OrderService: OrderService) {}

  @Post('/add')
  addOrder(@Body() orderDto: orderDto){
    return
  }
}
