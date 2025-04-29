import { Controller, UseGuards } from '@nestjs/common';
import { BaseController } from '../base/base.controller';
import { CreateUserDTO } from './user.dto';
import * as UserDto from './user.dto';
import { User } from '.prisma/client';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController extends BaseController<User, UserDto.CreateUserDTO, UserDto.UpdateUserDTO> {
    constructor(private userService: UserService) {
        super(userService);
    }
}