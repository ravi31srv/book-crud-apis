import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ type: String, example: 'ravi31srv@gmail.com' })
  @IsString()
  email: string;

  @ApiProperty({ type: String, example: 'Ravi31srv@' })
  @IsString()
  password: string;
}
