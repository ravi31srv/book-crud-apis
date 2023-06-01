/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import {  Model } from 'mongoose';
import {  InjectModel } from '@nestjs/mongoose';
import {  bookDocument } from './bookModel';
import { notificationGateway } from 'src/notification/socketGateway';

@Injectable()
export class BooksService {
  constructor(@InjectModel('Book') private bookModel: Model<bookDocument> , 
           private notificationService : notificationGateway
    ) {}

  // This Service adds new record of book in to books collection.  
  async create(createBookDto: CreateBookDto): Promise<any> {
    createBookDto.publishedOn = new Date();
    const book = await this.bookModel.create(createBookDto);
    await this.notificationService.server.emit('bookAdded', book.name) 
   await this.notificationService.handleBookAddEvent(this.notificationService.client ,{name : book.name})
 
      return book;
  }

  // Service to get list of books with pagination & caching
  async findAll(pageNumber = 1, pageSize = 10) {
    const skip = +pageSize * (+pageNumber - 1);
    const totalBooks = await this.bookModel.countDocuments();
    const books = await this.bookModel.find().limit(+pageSize).skip(+skip);
    return { bookDetails  : books , totalPages : Math.ceil(totalBooks/pageSize), pageNumber : +pageNumber , pageSize: +pageSize };
    }

// Service to get perticuler book by it's _id.
  async findOne(id: string): Promise<bookDocument> {
    const book = await this.bookModel.findById(id);
    return book;
  }

  // Service to update status of the the given book.
  async update(id: string, updateBookDto: UpdateBookDto) {
    await this.bookModel.findByIdAndUpdate(id, updateBookDto);
    await this.notificationService.server.emit('statusChangedByUser',{id , ...updateBookDto}) 
    await this.notificationService.handleStatusChaneEvent(this.notificationService.client ,{bookId :id })

    return `Book with ${id} has been updated successfully.`;
  }

  // Service to remove/delete the given book from the books collection.
  async remove(id: string) {
    await this.bookModel.findByIdAndDelete(id);
    await this.notificationService.server.emit('bookRemoved', id) 
    await this.notificationService.handleBookDeleteEvent(this.notificationService.client ,{id})
    return `Book with ${id} has been removed`;
  }
}
