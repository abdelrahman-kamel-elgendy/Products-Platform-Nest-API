import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.reository';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';
import { NotFoundException } from '../error/bad-request';
import { Category } from '@prisma/client';

describe('CategoryService', () => {
  let service: CategoryService;
  let repository: CategoryRepository;

  // Test data
  const testCategoryId = 'test-category-id';
  const createCategoryDto: CreateCategoryDto = {
    name: 'Test Category',
    description: 'Test description',
  };
  const updateCategoryDto: UpdateCategoryDto = {
    name: 'Updated Category',
    description: 'Updated description',
    isActive: false,
  };
  const mockCategory: Category = {
    id: testCategoryId,
    name: 'Test Category',
    description: 'Test description',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const mockUpdatedCategory: Category = {
    ...mockCategory,
    ...updateCategoryDto,
  };

  const mockCategoryRepository = {
    create: jest.fn().mockResolvedValue(mockCategory),
    findAll: jest.fn().mockResolvedValue([mockCategory]),
    findAllActive: jest.fn().mockResolvedValue([mockCategory]),
    findById: jest.fn().mockImplementation((id: string) => id === testCategoryId ? mockCategory : null),
    update: jest.fn().mockImplementation((id: string, data: UpdateCategoryDto) => id === testCategoryId ? { ...mockCategory, ...data } : null),
    delete: jest.fn().mockImplementation((id: string) => id === testCategoryId ? mockCategory : null),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: CategoryRepository,
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    repository = module.get<CategoryRepository>(CategoryRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const result = await service.create(createCategoryDto);

      expect(result).toEqual(mockCategory);
      expect(repository.create).toHaveBeenCalledWith(createCategoryDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const result = await service.findAll();

      expect(result).toEqual([mockCategory]);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('findAllActive', () => {
    it('should return an array of active categories', async () => {
      const result = await service.findAllActive();

      expect(result).toEqual([mockCategory]);
      expect(repository.findAllActive).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a category when found', async () => {
      const result = await service.findById(testCategoryId);

      expect(result).toEqual(mockCategory);
      expect(repository.findById).toHaveBeenCalledWith(testCategoryId);
    });

    it('should throw NotFoundException when category not found', async () => {
      const invalidId = 'invalid-id';

      await expect(service.findById(invalidId)).rejects.toThrow(
        new NotFoundException(`Record with id: ${invalidId} not found`)
      );
      expect(repository.findById).toHaveBeenCalledWith(invalidId);
    });
  });

  describe('update', () => {
    it('should update a category when found', async () => {
      const result = await service.update(testCategoryId, updateCategoryDto);

      expect(result).toEqual(mockUpdatedCategory);
      expect(repository.findById).toHaveBeenCalledWith(testCategoryId);
      expect(repository.update).toHaveBeenCalledWith(testCategoryId, updateCategoryDto);
    });

    it('should throw NotFoundException when category not found', async () => {
      const invalidId = 'invalid-id';

      await expect(service.update(invalidId, updateCategoryDto)).rejects.toThrow(
        new NotFoundException(`Record with id: ${invalidId} not found`)
      );
      expect(repository.findById).toHaveBeenCalledWith(invalidId);
    });
  });

  describe('delete', () => {
    it('should delete a category when found', async () => {
      const result = await service.delete(testCategoryId);

      expect(result).toEqual(mockCategory);
      expect(repository.findById).toHaveBeenCalledWith(testCategoryId);
      expect(repository.delete).toHaveBeenCalledWith(testCategoryId);
    });

    it('should throw NotFoundException when category not found', async () => {
      const invalidId = 'invalid-id';

      await expect(service.delete(invalidId)).rejects.toThrow(
        new NotFoundException(`Record with id: ${invalidId} not found`)
      );
      expect(repository.findById).toHaveBeenCalledWith(invalidId);
    });
  });
});