import { Controller, UseGuards } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from 'node_modules/.prisma/client';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController extends BaseController<User, CreateUserDTO, UpdateUserDTO> {
    constructor(private userService: UserService) {
        super(userService);
    }
}