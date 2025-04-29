import { Injectable, NotFoundException } from '@nestjs/common';
import { Role, User } from 'node_modules/.prisma/client';
import { BaseService } from '../base/baseService';
import {CreateUserDTO, UpdateUserDTO} from './user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService extends BaseService<User, CreateUserDTO, UpdateUserDTO> {
    constructor(private userRepository: UserRepository) {
        super(userRepository);
    }

    async create(dto: CreateUserDTO): Promise<User> {
        
        const user = {
                ...dto,
                password: dto.password,
                role: dto.role ? dto.role as Role : 'user',
        }
        return this.userRepository.create(user);
    }

    async findByEmail(email: string): Promise<User> {
        return await this.userRepository.findByEmail(email);
    }
}
