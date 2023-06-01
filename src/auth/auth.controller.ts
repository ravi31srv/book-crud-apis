import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { ReturnValue } from 'src/shapes/responseRO';
import { LoginDto } from './dto/login.dto';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiResponse({ status: 400, description: 'BAD_REQUEST' })
@ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR })
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({
    summary: 'Register as a new user.',
  })
  @Post('/signup')
  async signup(@Body() userDto: SignupDto): Promise<ReturnValue<any>> {
    try {
      const userId = await this.authService.signup(userDto);
      return {
        message: 'User signedup successfully.',
        data: userId,
        statusCode: 201,
      };
    } catch (error) {
      throw error;
    }
  }



  @ApiOperation({
    summary: 'Login.',
  })
  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<ReturnValue<any>> {
    try {
      const data = await this.authService.login(loginDto);
      return { data, message: 'User logedin successfullt', statusCode: 200 };
    } catch (error) {
      throw error;
    }
  }
}
