import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { bookStatus } from '../bookModel';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ type: String, example: 'BookA' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, example: 'XYZ' })
  @IsString()
  @IsNotEmpty()
  publication: string;

  @ApiProperty({ type: String, example: 'fiction' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ type: Date, example: '11-01-2021' })
  @IsString()
  @IsNotEmpty()
  publishedOn: Date;

  @ApiProperty({ type: String, example: 'The great auther A' })
  @IsString()
  @IsNotEmpty()
  auther: string;

  @ApiProperty({ enum: bookStatus, example: 'issued' })
  @IsEnum(bookStatus)
  @IsNotEmpty()
  status: string;
}
