import { Injectable } from '@nestjs/common';
import { Category } from '../../node_modules/.prisma/client';
import { BaseService } from '../base/baseService';
import * as categoryDto from "./category.dto";
import { CategoryRepository } from './category.reository';

@Injectable()
export class CategoryService extends BaseService<Category, categoryDto.CreateCategoryDto, categoryDto.updateCategoryDto> {
    constructor(private categoryRepository: CategoryRepository) {
        super(categoryRepository);
    }
}
