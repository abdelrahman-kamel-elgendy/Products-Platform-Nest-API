import { Controller, UseGuards } from '@nestjs/common';
import { BaseController } from '../base/base.controller';
import { User } from '.prisma/client';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController extends BaseController<User, CreateUserDto, UpdateUserDto> {
    constructor(private userService: UserService) {
        super(userService);
    }
}