import { Injectable } from '@nestjs/common';
import { Category } from '../../node_modules/.prisma/client';
import { BaseService } from '../base/baseService';
import { CategoryRepository } from './category.reository';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';

@Injectable()
export class CategoryService extends BaseService<Category, CreateCategoryDto, UpdateCategoryDto> {
    constructor(private categoryRepository: CategoryRepository) {
        super(categoryRepository);
    }
}
