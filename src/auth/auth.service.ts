import { BadRequestException, Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
//import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { userDocument } from './userModel';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<userDocument>,
    private jwtService: JwtService,
  ) { }

  async validateJwt(token: any) {
    return await this.jwtService.verify(token);
  }

  async signup(userDto: SignupDto) {
    const checkUser = await this.userModel.findOne({
      $and: [
        { $or: [{ mobileNo: userDto.mobileNo }, { email: userDto.email }] },
        { role: userDto.role },
      ],
    });

    if (checkUser) {
      throw new BadRequestException(
        'User already exist with provided email or mobileNo',
      );
    }
    userDto.password = await bcrypt.hash(
      userDto.password,
      +process.env.JWT_ROUNDS,
    );
    const user = await this.userModel.create(userDto);

    return user._id;
  }

  async login(loginDto: LoginDto) {
    const user: any = await this.userModel.findOne({ email: loginDto.email });
    if (!user) {
      throw new BadRequestException(
        `User does not exists with ${loginDto.email} `,
      );
    }
    const { _id, firstName, lastName, password, email, country, role } = user;
    const areEqual = await bcrypt.compare(loginDto.password, password);
    if (!areEqual) {
      throw new BadRequestException(`Incorrect password`);
    }
    delete user.password;
    const tokenPayload = { _id, firstName, lastName, email, country, role };
    const authToken = await this.jwtService.sign(tokenPayload, {
      secret: process.env.jwt_SECRET,
    });
    return { authToken };
  }
}
