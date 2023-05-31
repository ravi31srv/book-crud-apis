import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Inject,
  Req,
  HttpStatus,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ReturnValue } from 'src/shapes/responseRO';
import { AuthGuard } from 'src/helpers/authGuard';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { RolesGuard } from 'src/helpers/roleGuard';
import { Roles } from 'src/decorators/roles';
import { useRoles } from 'src/auth/userModel';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Book CRUD')
@ApiResponse({ status: 400, description: 'BAD_REQUEST' })
@UseGuards(AuthGuard, RolesGuard)
@Controller('books')
export class BooksController {
  //Injecting required modules as dependecny.
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly booksService: BooksService,
  ) {}

  //Insert book record.
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Book added successfully.',
  })
  @ApiBearerAuth()
  @Post()
  @Roles(useRoles.admin) //user having 'admin' role only can perform this operation.
  async create(
    @Body() createBookDto: CreateBookDto,
  ): Promise<ReturnValue<any>> {
    const addBook = await this.booksService.create(createBookDto);
    return {
      data: addBook,
      statusCode: 201,
      message: 'Book Added Successfully',
    };
  }

  //Get list of Books
  @Roles(useRoles.user)
  @ApiBearerAuth()
  @Get()
  async findAll(
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number,
  ): Promise<ReturnValue<any>> {
    try {
      let result: any = await this.cacheManager.get('data');

      if (result?.pageNumber != pageNumber || result?.pageSize != pageSize) {
        result = await this.booksService.findAll(pageNumber, pageSize);
        await this.cacheManager.set('data', result, 100000);
      }
      return {
        data: result,
        message: 'Books fetched successfully',
        statusCode: 200,
      };
    } catch (error) {
      throw error;
    }
  }

  @Roles(useRoles.user)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReturnValue<any>> {
    try {
      const book = await this.booksService.findOne(id);
      return {
        data: book,
        message: 'Book-details fetched successfully.',
        statusCode: 200,
      };
    } catch (error) {
      throw error;
    }
  }

  // Update status of the book using value 'issued' or 'available'
  @Roles(useRoles.user)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @Req() req: any,
  ): Promise<ReturnValue<any>> {
    try {
      const updateMessage = await this.booksService.update(id, updateBookDto);
      return { message: updateMessage, statusCode: 200 };
    } catch (error) {
      throw error;
    }
  }

  // To remove book from db by admin
  @Roles(useRoles.admin)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ReturnValue<any>> {
    try {
      const message: string = await this.booksService.remove(id);
      return { message, statusCode: 200 };
    } catch (error) {
      throw error;
    }
  }
}
