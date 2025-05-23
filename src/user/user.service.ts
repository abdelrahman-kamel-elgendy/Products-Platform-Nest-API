import { Injectable, NotFoundException } from '@nestjs/common';
import { Role, User } from 'node_modules/.prisma/client';
import { BaseService } from '../base/baseService';
import {CreateUserDto, UpdateUserDto} from './user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService extends BaseService<User, CreateUserDto, UpdateUserDto> {
    constructor(private userRepository: UserRepository) {
        super(userRepository);
    }

    async findByEmail(email: string): Promise<User> {
        return await this.userRepository.findByEmail(email);
    }
}
