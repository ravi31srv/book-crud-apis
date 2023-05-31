import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum useRoles {
  admin = 'admin',
  user = 'user',
}

export type userDocument = User & Document;
@Schema({ versionKey: false, timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: useRoles })
  role: string;

  @Prop({ required: true })
  mobileNo: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  city: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
