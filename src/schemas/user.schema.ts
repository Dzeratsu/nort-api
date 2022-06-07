import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ requred: true })
  id: number;

  @Prop({ requred: true })
  user: string;

  @Prop({ requred: true })
  email: string;

  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop({ default: 0 })
  role: number;

  @Prop({ default: new Date() })
  registredDate: Date;
}
export const UserSchema = SchemaFactory.createForClass(User);
