import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { NotFoundException } from '../error/bad-request';
import { Category, Product } from '@prisma/client';
import { CategoryRepository } from '..//category/category.reository';

describe('ProductService', () => {
  let service: ProductService;
  let repository: ProductRepository;

  // Test data
  const testProductId = 'test-product-id';
  const testCategoryId = 'test-category-id';
  const createProductDto: CreateProductDto = {
      name: 'Test Product',
      description: 'Test description',
      price: 100,
      categoryId: testCategoryId
  };
  const updateProductDto: UpdateProductDto = {
    name: 'Updated Product',
    description: 'Updated description',
    price: 150,
    isActive: false,
  };
  const mockProduct = {
    id: testProductId,
    name: 'Test Product',
    description: 'Test description',
    price: 100,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const mockUpdatedProduct = {
    ...mockProduct,
    ...updateProductDto,
  };
  
    const mockCategory: Category = {
      id: testCategoryId,
      name: 'Test Category',
      description: 'Test description',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

  const mockProductRepository = {
    create: jest.fn().mockResolvedValue(mockProduct),
    findAll: jest.fn().mockResolvedValue([mockProduct]),
    findAllActive: jest.fn().mockResolvedValue([mockProduct]),
    findById: jest.fn().mockImplementation((id: string) => id === testProductId ? mockProduct : null),
    update: jest.fn().mockImplementation((id: string, data: UpdateProductDto) => id === testProductId ? { ...mockProduct, ...data } : null),
    delete: jest.fn().mockImplementation((id: string) => id === testProductId ? mockProduct : null),
  };

  const mockCategoryRepository = {
      findById: jest.fn().mockImplementation((id: string) => id === testCategoryId ? mockCategory : null),
    };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductRepository,
          useValue: mockProductRepository,
        },
        {
            provide: CategoryRepository,
            useValue: mockCategoryRepository
        }
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get<ProductRepository>(ProductRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const result = await service.create(createProductDto);

      expect(result).toEqual(mockProduct);
      expect(repository.create).toHaveBeenCalledWith(createProductDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const result = await service.findAll();

      expect(result).toEqual([mockProduct]);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('findAllActive', () => {
    it('should return an array of active products', async () => {
      const result = await service.findAllActive();

      expect(result).toEqual([mockProduct]);
      expect(repository.findAllActive).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a product when found', async () => {
      const result = await service.findById(testProductId);

      expect(result).toEqual(mockProduct);
      expect(repository.findById).toHaveBeenCalledWith(testProductId);
    });

    it('should throw NotFoundException when product not found', async () => {
      const invalidId = 'invalid-id';

      await expect(service.findById(invalidId)).rejects.toThrow(
        new NotFoundException(`Record with id: ${invalidId} not found`)
      );
      expect(repository.findById).toHaveBeenCalledWith(invalidId);
    });
  });

  describe('update', () => {
    it('should update a product when found', async () => {
      const result = await service.update(testProductId, updateProductDto);

      expect(result).toEqual(mockUpdatedProduct);
      expect(repository.findById).toHaveBeenCalledWith(testProductId);
      expect(repository.update).toHaveBeenCalledWith(testProductId, updateProductDto);
    });

    it('should throw NotFoundException when product not found', async () => {
      const invalidId = 'invalid-id';

      await expect(service.update(invalidId, updateProductDto)).rejects.toThrow(
        new NotFoundException(`Record with id: ${invalidId} not found`)
      );
      expect(repository.findById).toHaveBeenCalledWith(invalidId);
    });
  });

  describe('delete', () => {
    it('should delete a product when found', async () => {
      const result = await service.delete(testProductId);

      expect(result).toEqual(mockProduct);
      expect(repository.findById).toHaveBeenCalledWith(testProductId);
      expect(repository.delete).toHaveBeenCalledWith(testProductId);
    });

    it('should throw NotFoundException when product not found', async () => {
      const invalidId = 'invalid-id';

      await expect(service.delete(invalidId)).rejects.toThrow(
        new NotFoundException(`Record with id: ${invalidId} not found`)
      );
      expect(repository.findById).toHaveBeenCalledWith(invalidId);
    });
  });
});