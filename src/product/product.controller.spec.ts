import { Test, TestingModule } from "@nestjs/testing";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { CreateProductDto, UpdateProductDto } from "./product.dto";

describe('ProductController', () => {
    let controller: ProductController;

    // Test data
    const testProductId = '12345';
    const createData: CreateProductDto = {
        name: "Test Product",
        description: "Test description",
        price: 99.99,
        categoryId: "category-123"
    };
    const updateData: UpdateProductDto = {
        name: "Updated Product",
        description: "Updated description",
        price: 129.99,
        isActive: false
    };
    const mockProduct = {
        id: testProductId,
        name: "Test Product",
        description: "Test description",
        price: 99.99,
        categoryId: "category-123",
        isActive: true,
        createdAt: Date.now(),
        updatedAt: Date.now()
    };

    // Mock service implementation
    const mockProductService = {
        create: jest.fn((dto: CreateProductDto) => {
            return {
                id: testProductId,
                isActive: true,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                ...dto
            }}),
        findAll: jest.fn(() => [mockProduct]),
        findAllActive: jest.fn(() => [mockProduct]),
        findById: jest.fn((id: string) => id === testProductId ? mockProduct : null),
        update: jest.fn((id: string, dto: UpdateProductDto) => id === testProductId ? { ...mockProduct, ...dto } : null),
        delete: jest.fn((id: string) => id === testProductId ? true : false),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [
                {
                    provide: ProductService,
                    useValue: mockProductService
                }
            ]
        }).compile();

        controller = module.get<ProductController>(ProductController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a new product', async () => {
            const result = await controller.create(createData);

            expect(result).toEqual({
                id: expect.any(String),
                name: createData.name,
                description: createData.description,
                price: createData.price,
                categoryId: createData.categoryId,
                isActive: true,
                createdAt: expect.any(Number),
                updatedAt: expect.any(Number)
            });
            expect(mockProductService.create).toHaveBeenCalledWith(createData);
        });
    });

    describe('findAll', () => {
        it('should return an array of products', async () => {
            const result = await controller.findAll();

            expect(result).toEqual([{
                id: expect.any(String),
                name: expect.any(String),
                description: expect.any(String),
                price: expect.any(Number),
                categoryId: expect.any(String),
                isActive: true,
                createdAt: expect.any(Number),
                updatedAt: expect.any(Number)
            }]);
            expect(mockProductService.findAll).toHaveBeenCalled();
        });
    });

    describe('findAllActive', () => {
        it('should return an array of active products', async () => {
            const result = await controller.findAllActive();

            expect(result).toEqual([{
                id: expect.any(String),
                name: expect.any(String),
                description: expect.any(String),
                price: expect.any(Number),
                categoryId: expect.any(String),
                isActive: true,
                createdAt: expect.any(Number),
                updatedAt: expect.any(Number)
            }]);
            expect(mockProductService.findAllActive).toHaveBeenCalled();
        });
    });

    describe('findById', () => {  
        it('should return a single product', async () => {
            const result = await controller.findById(testProductId);  

            expect(result).toEqual({
                id: testProductId,
                name: expect.any(String),
                description: expect.any(String),
                price: expect.any(Number),
                categoryId: expect.any(String),
                isActive: true,
                createdAt: expect.any(Number),
                updatedAt: expect.any(Number)
            });
            expect(mockProductService.findById).toHaveBeenCalledWith(testProductId);
        });
    });

    describe('update', () => {
        it('should update a product', async () => {
            const result = await controller.update(testProductId, updateData);

            expect(result).toEqual({
                id: testProductId,
                name: updateData.name,
                description: updateData.description,
                price: updateData.price,
                categoryId: mockProduct.categoryId,
                isActive: updateData.isActive,
                createdAt: expect.any(Number),
                updatedAt: expect.any(Number)
            });
            expect(mockProductService.update).toHaveBeenCalledWith(
                testProductId,
                updateData
            );
        });
    });

    describe('delete', () => {  
        it('should delete a product', async () => {
            await controller.delete(testProductId);  
            expect(mockProductService.delete).toHaveBeenCalledWith(testProductId); 
        });
    });
});