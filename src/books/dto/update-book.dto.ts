import { ApiProperty } from '@nestjs/swagger';
import { bookStatus } from '../bookModel';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class UpdateBookDto {
  @ApiProperty({ enum: bookStatus, example: 'issued' })
  @IsEnum(bookStatus)
  @IsString()
  @IsNotEmpty()
  status: string;
}
