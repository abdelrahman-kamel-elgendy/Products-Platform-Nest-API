import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDTO } from './user.dto';
import { PrismaService } from '../prisma/prisma.service';

describe('UserController', () => {
  let controller: UserController;

  const createUserDto: CreateUserDTO = {
    name: 'Abdelrahman',
    email: 'Abdelrahman.kamel.elgendy@gmail.com',
    password: 'Abdelrahman1234',
    passwordConfirmation: ''
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
