import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type bookDocument = Book & Document;

export enum bookStatus {
  ISSUED = 'issued',
  AVAILABLE = 'available',
}
@Schema({ versionKey: false, timestamps: true })
export class Book {
  @Prop()
  name: string;

  @Prop()
  publication: string;

  @Prop()
  category: string;

  @Prop()
  publishedOn: Date;

  @Prop()
  auther: string;

  @Prop({ require: true, enum: bookStatus })
  status: string;
}
export const BookSchema = SchemaFactory.createForClass(Book);
