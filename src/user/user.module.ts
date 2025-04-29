// user.module.ts (fixed)
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule], // This provides PrismaService
  controllers: [UserController],
  providers: [UserService, UserRepository], // Removed PrismaService here
  exports: [UserService],
})
export class UserModule {}