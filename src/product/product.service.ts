import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../base/baseService';
import { Product } from '@prisma/client';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';
import { ProductRepository } from './product.repository';
import { CategoryRepository } from '../category/category.reository';

@Injectable()
export class ProductService extends BaseService<Product, CreateProductDTO, UpdateProductDTO> {
    constructor(private productRepository: ProductRepository, private categoryRepository: CategoryRepository) {
        super(productRepository);
    }

    async create(data: CreateProductDTO): Promise<Product> {
        const category = await this.categoryRepository.findById(data.categoryId);
        if(!category)
            throw new NotFoundException(`Category with id: ${data.categoryId} not found.`)
        
        return this.productRepository.create(data);
    }
}
