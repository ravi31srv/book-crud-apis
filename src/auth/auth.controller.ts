import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { ReturnValue } from 'src/shapes/responseRO';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

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
