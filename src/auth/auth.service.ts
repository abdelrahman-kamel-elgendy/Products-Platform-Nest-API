import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
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
  
    if (!await bcrypt.compare(pass, user.password))
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
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    return this.userService.create({
      ...registerDto,
      password: hashedPassword,
    });
  }
}