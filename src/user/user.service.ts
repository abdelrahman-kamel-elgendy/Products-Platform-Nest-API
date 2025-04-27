import { Injectable, NotFoundException } from '@nestjs/common';
import { Role, User } from 'generated/prisma';
import { BaseService } from 'src/base/baseService';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UserService extends BaseService<User, CreateUserDTO, UpdateUserDTO> {
    constructor(private prisma: PrismaService) {
        super(prisma.user);
    }

    async create(dto: CreateUserDTO): Promise<User> {
        const hashedPassword = await argon.hash(dto.password);
        return this.prisma.user.create({
            data: {
                ...dto,
                password: hashedPassword,
                role: dto.role ? dto.role as Role : 'user',
            },
        });
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.prisma.user.findUnique({ where: { email } });

        if (!user) 
            throw new NotFoundException('User not found');
        

        return user;
    }
}
