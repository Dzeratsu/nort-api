import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { orderDto } from './dto/orderDto';
import { Order, OrderDocument } from '../schemas/order.schema';
import { Model } from 'mongoose';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
  ) {}

  async assignID(): Promise<number> {
    let newID: number;
    const lastId = await this.orderModel.find().limit(1).sort({ id: -1 });
    if (lastId[0] == undefined) {
      newID = 1;
    } else {
      newID = +lastId[0].id + 1;
    }
    return newID;
  }

  async allMonth(login, monthID) {
    console.log(login)
    const orders = await this.orderModel.find({
      $and: [{ manager: login.username }, { month: monthID }],
    });
    try {
      return orders;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async newOrder(orderDto: orderDto) {
    orderDto.id = await this.assignID();
    const order = new this.orderModel(orderDto);
    const save = await order.save();
    try {
      return save;
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
