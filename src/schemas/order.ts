import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface IProduct {
  id: number;
  count: number;
}

export interface IResult {
  date: Date;
  text: string;
}

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ default: new Date() })
  date: Date;

  @Prop({ max: 11 })
  month: number;

  @Prop({ requred: true })
  manager: number;

  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  email: number;

  @Prop({ maxlength: 11 })
  phone: number;

  @Prop()
  sity: string;

  @Prop({ min: 0, max: 6, default: 0 })
  status: number;

  @Prop()
  textOrder: string;

  @Prop({ default: [] })
  product: [IProduct];

  @Prop({ default: [] })
  result: [IResult];

  @Prop({ default: false })
  read: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
