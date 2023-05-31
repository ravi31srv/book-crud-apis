import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { useRoles } from '../userModel';
import { ApiProperty } from '@nestjs/swagger';
export class SignupDto {
  @ApiProperty({ type: String, example: 'Ravi' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ type: String, example: 'Solanki' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ type: String, example: 'xyz@gmail.com' })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String, example: 'xyz123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ type: String, example: '8767985645' })
  @IsMobilePhone()
  @IsString()
  @IsNotEmpty()
  mobileNo: string;

  @ApiProperty({ enum: useRoles })
  @IsEnum(useRoles)
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty({ type: String, example: 'India' })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ type: String, example: 'Gujarat' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ type: String, example: 'Ahemedabad' })
  @IsString()
  @IsNotEmpty()
  city: string;
}
