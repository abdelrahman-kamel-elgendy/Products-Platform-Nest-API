import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { CreateUserDto, UpdateUserDto } from "./user.dto";

describe('UserController', () => {
    let controller: UserController;

    // Test data
    const testUserId = 'user-123';
    const createData: CreateUserDto = {
        email: "test@example.com",
        password: "securePassword123",
        passwordConfirmation: "securePassword123",
        name: "John",
        role: "user",
    };
    const updateData: UpdateUserDto = {
        name: "Jonathan",
        isActive: false,
        role: 'user',
    };
    const mockUser = {
        id: testUserId,
        email: "test@example.com",
        password: "hashedPassword",
        name: "John",
        role: "user",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    // Mock service implementation
    const mockUserService = {
        create: jest.fn((dto: CreateUserDto) => {
            return {
                id: testUserId,
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                email: dto.email,
                name: dto.name,
                role: dto.role,
            }
        }),
        findAll: jest.fn(() => [{ ...mockUser, password: undefined }]),
        findAllActive: jest.fn(() => [{ ...mockUser, password: undefined }]),
        findById: jest.fn((id: string) => id === testUserId ? { ...mockUser, password: undefined } : null),
        update: jest.fn((id: string, dto: UpdateUserDto) => id === testUserId ? { ...mockUser, ...dto, password: undefined } : null),
        delete: jest.fn((id: string) => id === testUserId ? true : false),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: mockUserService
                }
            ]
        }).compile();

        controller = module.get<UserController>(UserController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a new user', async () => {
            const result = await controller.create(createData);

            expect(result).toEqual({
                id: expect.any(String),
                email: createData.email,
                name: createData.name,
                role: createData.role,
                isActive: true,
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date)
            });
            // Ensure password fields are not returned
            expect(result).not.toHaveProperty('password');
            expect(result).not.toHaveProperty('passwordConfirmation');
            expect(mockUserService.create).toHaveBeenCalledWith(createData);
        });
    });

    describe('findAll', () => {
        it('should return an array of users', async () => {
            const result = await controller.findAll();

            expect(result).toEqual([{
                id: expect.any(String),
                email: expect.any(String),
                name: expect.any(String),
                role: expect.any(String),
                isActive: true,
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date)
            }]);
            expect(mockUserService.findAll).toHaveBeenCalled();
        });
    });

    describe('findAllActive', () => {
        it('should return an array of active users', async () => {
            const result = await controller.findAllActive();

            expect(result).toEqual([{
                id: expect.any(String),
                email: expect.any(String),
                name: expect.any(String),
                role: expect.any(String),
                isActive: true,
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date)
            }]);
            expect(mockUserService.findAllActive).toHaveBeenCalled();
        });
    });

    describe('findById', () => {
        it('should return a single user', async () => {
            const result = await controller.findById(testUserId);

            expect(result).toEqual({
                id: testUserId,
                email: expect.any(String),
                name: expect.any(String),
                role: expect.any(String),
                isActive: true,
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date)
            });
            expect(mockUserService.findById).toHaveBeenCalledWith(testUserId);
        });
    });

    describe('update', () => {
        it('should update a user', async () => {
            const result = await controller.update(testUserId, updateData);

            expect(result).toEqual({
                id: testUserId,
                email: mockUser.email,
                name: updateData.name,
                role: updateData.role,
                isActive: updateData.isActive,
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date)
            });
            expect(mockUserService.update).toHaveBeenCalledWith(
                testUserId,
                updateData
            );
        });
    });

    describe('delete', () => {
        it('should delete a user', async () => {
            await controller.delete(testUserId);
            expect(mockUserService.delete).toHaveBeenCalledWith(testUserId);
        });
    });
});