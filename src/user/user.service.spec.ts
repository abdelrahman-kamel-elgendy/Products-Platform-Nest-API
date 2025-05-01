import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { NotFoundException } from '../error/bad-request';
import { User } from '@prisma/client';

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;

  // Test data
  const testUserId = 'test-user-id';
  const createUserDto: CreateUserDto = {
    email: 'test@example.com',
    password: 'securePassword123',
    passwordConfirmation: 'securePassword123',
    name: 'Test User',
    role: 'user',
  };
  const updateUserDto: UpdateUserDto = {
    name: 'Updated User',
    isActive: false,
    role: 'admin',
  };
  const mockUser: User = {
    id: testUserId,
    email: 'test@example.com',
    password: 'hashedPassword',
    name: 'Test User',
    role: 'user',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const mockUpdatedUser = {
    ...mockUser,
    ...updateUserDto,
  };

  const mockUserRepository = {
    create: jest.fn().mockImplementation((dto: CreateUserDto) =>
      Promise.resolve({
        ...mockUser,
        name: dto.name,
        email: dto.email,
        role: dto.role,
      })),
    findAll: jest.fn().mockResolvedValue([mockUser]),
    findAllActive: jest.fn().mockResolvedValue([mockUser]),
    findById: jest.fn().mockImplementation((id: string) => id === testUserId ? mockUser : null),
    findByEmail: jest.fn().mockImplementation((email: string) => email === mockUser.email ? mockUser : null),
    update: jest.fn().mockImplementation((id: string, data: UpdateUserDto) => id === testUserId ? { ...mockUser, ...data } : null),
    delete: jest.fn().mockImplementation((id: string) => id === testUserId ? mockUser : null),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const result = await service.create(createUserDto);

      expect(result).toEqual({
        ...mockUser,
        name: createUserDto.name,
        email: createUserDto.email,
        role: createUserDto.role,
      });
      expect(repository.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await service.findAll();

      expect(result).toEqual([mockUser]);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('findAllActive', () => {
    it('should return an array of active users', async () => {
      const result = await service.findAllActive();

      expect(result).toEqual([mockUser]);
      expect(repository.findAllActive).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a user when found', async () => {
      const result = await service.findById(testUserId);

      expect(result).toEqual(mockUser);
      expect(repository.findById).toHaveBeenCalledWith(testUserId);
    });

    it('should throw NotFoundException when user not found', async () => {
      const invalidId = 'invalid-id';

      await expect(service.findById(invalidId)).rejects.toThrow(
        new NotFoundException(`Record with id: ${invalidId} not found`)
      );
      expect(repository.findById).toHaveBeenCalledWith(invalidId);
    });
  });

  describe('findByEmail', () => {
    it('should return a user when found by email', async () => {
      const result = await service.findByEmail(mockUser.email);

      expect(result).toEqual(mockUser);
      expect(repository.findByEmail).toHaveBeenCalledWith(mockUser.email);
    });

    it('should return null when user not found by email', async () => {
      const invalidEmail = 'invalid@example.com';
      repository.findByEmail = jest.fn().mockResolvedValue(null);

      const result = await service.findByEmail(invalidEmail);

      expect(result).toBeNull();
      expect(repository.findByEmail).toHaveBeenCalledWith(invalidEmail);
    });
  });

  describe('update', () => {
    it('should update a user when found', async () => {
      const result = await service.update(testUserId, updateUserDto);

      expect(result).toEqual(mockUpdatedUser);
      expect(repository.findById).toHaveBeenCalledWith(testUserId);
      expect(repository.update).toHaveBeenCalledWith(testUserId, updateUserDto);
    });

    it('should throw NotFoundException when user not found', async () => {
      const invalidId = 'invalid-id';

      await expect(service.update(invalidId, updateUserDto)).rejects.toThrow(
        new NotFoundException(`Record with id: ${invalidId} not found`)
      );
      expect(repository.findById).toHaveBeenCalledWith(invalidId);
    });
  });

  describe('delete', () => {
    it('should delete a user when found', async () => {
      const result = await service.delete(testUserId);

      expect(result).toEqual(mockUser);
      expect(repository.findById).toHaveBeenCalledWith(testUserId);
      expect(repository.delete).toHaveBeenCalledWith(testUserId);
    });

    it('should throw NotFoundException when user not found', async () => {
      const invalidId = 'invalid-id';

      await expect(service.delete(invalidId)).rejects.toThrow(
        new NotFoundException(`Record with id: ${invalidId} not found`)
      );
      expect(repository.findById).toHaveBeenCalledWith(invalidId);
    });
  });
});