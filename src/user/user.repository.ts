// user.repository.ts
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { BaseRepository } from '../base/base.repository';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '../error/bad-request';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable() // Make sure this is present
export class UserRepository extends BaseRepository<User, CreateUserDto, UpdateUserDto> {
  constructor(private prisma: PrismaService) {
    super(prisma.user);
  }

    async findByEmail(email: string): Promise<User> {
        const user = await this.prisma.user.findUnique({ where: { email } });

        if (!user) 
            throw new NotFoundException('User not found');
        
        return user;
    }
}
