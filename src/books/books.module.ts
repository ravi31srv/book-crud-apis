/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './bookModel';
import { AuthGuard } from 'src/helpers/authGuard';
import { RolesGuard } from 'src/helpers/roleGuard';
import { notificationGateway } from 'src/notification/socketGateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
    CacheModule.register(),
  ],
  controllers: [BooksController],
  providers: [
    BooksService,
    AuthGuard,
    RolesGuard,
    notificationGateway
  ],
})
export class BooksModule {}
