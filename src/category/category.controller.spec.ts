import { Test, TestingModule } from "@nestjs/testing";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { CreateCategoryDto, UpdateCategoryDto } from "./category.dto";

describe('CategoryController', () => {
    let controller: CategoryController;

    // Test data
    const testCategoryId = '12345';
    const createData: CreateCategoryDto = {
        name: "Test Category",
        description: "Test description",
    };
    const updateData: UpdateCategoryDto = {
        name: "Updated Category",
        description: "Updated description",
        isActive: false
    };
    const mockCategory = {
        id: testCategoryId,
        name: "Test Category",
        description: "Test description",
        isActive: true,
        createdAt: Date.now(),
        updatedAt: Date.now()
    };

    // Mock service implementation
    const mockCategoryService = {
        create: jest.fn((dto: CreateCategoryDto) => {
            return {
                id: testCategoryId,
                isActive: true,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                ...dto
            }
        }),
        findAll: jest.fn(() => [mockCategory]),
        findAllActive: jest.fn(() => [mockCategory]),
        findById: jest.fn((id: string) => id === testCategoryId ? mockCategory : null),
        update: jest.fn((id: string, dto: UpdateCategoryDto) => id === testCategoryId ? { ...mockCategory, ...dto } : null),
        delete: jest.fn((id: string) => id === testCategoryId ? true : false),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CategoryController],
            providers: [
                {
                    provide: CategoryService,
                    useValue: mockCategoryService
                }
            ]
        }).compile();

        controller = module.get<CategoryController>(CategoryController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a new category', async () => {
            const result = await controller.create(createData);

            expect(result).toEqual({
                id: expect.any(String),
                name: createData.name,
                description: createData.description,
                isActive: true,
                createdAt: expect.any(Number),
                updatedAt: expect.any(Number)
            });
            expect(mockCategoryService.create).toHaveBeenCalledWith(createData);
        });
    });

    describe('findAll', () => {
        it('should return an array of categories', async () => {
            const result = await controller.findAll();

            expect(result).toEqual([{
                id: expect.any(String),
                name: expect.any(String),
                description: expect.any(String),
                isActive: true,
                createdAt: expect.any(Number),
                updatedAt: expect.any(Number)
            }]);
            expect(mockCategoryService.findAll).toHaveBeenCalled();
        });
    });

    describe('findAllActive', () => {
        it('should return an array of active categories', async () => {
            const result = await controller.findAllActive();

            expect(result).toEqual([{
                id: expect.any(String),
                name: expect.any(String),
                description: expect.any(String),
                isActive: true,
                createdAt: expect.any(Number),
                updatedAt: expect.any(Number)
            }]);
            expect(mockCategoryService.findAllActive).toHaveBeenCalled();
        });
    });

    describe('findById', () => {
        it('should return a single category', async () => {
            const result = await controller.findById(testCategoryId);

            expect(result).toEqual({
                id: testCategoryId,
                name: expect.any(String),
                description: expect.any(String),
                isActive: true,
                createdAt: expect.any(Number),
                updatedAt: expect.any(Number)
            });
            expect(mockCategoryService.findById).toHaveBeenCalledWith(testCategoryId);
        });
    });

    describe('update', () => {
        it('should update a category', async () => {
            const result = await controller.update(testCategoryId, updateData);

            expect(result).toEqual({
                id: testCategoryId,
                name: updateData.name,
                description: updateData.description,
                isActive: updateData.isActive,
                createdAt: expect.any(Number),
                updatedAt: expect.any(Number)
            });
            expect(mockCategoryService.update).toHaveBeenCalledWith(
                testCategoryId,
                updateData
            );
        });
    });

    describe('delete', () => {
        it('should delete a category', async () => {
            await controller.delete(testCategoryId);
            expect(mockCategoryService.delete).toHaveBeenCalledWith(testCategoryId);
        });
    });
});