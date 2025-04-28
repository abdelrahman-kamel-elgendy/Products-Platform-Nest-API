import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as argon from 'argon2';
import { BadRequestException } from '../error/bad-request';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user)
      throw new BadRequestException('Invalid credentials');
  
    if (!await argon.verify(user.password, pass))
      throw new BadRequestException('Invalid credentials');

    const { password, ...result } = user;
    return result;
  }

  async login(user: any) {

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: any) {
    const hashedPassword = await argon.hash(registerDto.password);
    return this.userService.create({
      ...registerDto,
      password: hashedPassword,
    });
  }
}