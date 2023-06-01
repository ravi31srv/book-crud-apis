import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    BooksModule,
    AuthModule,
    MongooseModule.forRoot(process.env.MONGO_URLA),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
