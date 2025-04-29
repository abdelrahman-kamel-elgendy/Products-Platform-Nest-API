import { Controller, UseGuards } from '@nestjs/common';
import { BaseController } from '../base/base.controller'; 
import * as categoryDto from "./category.dto";
import { Category } from '../../node_modules/.prisma/client';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('category')
export class CategoryController extends BaseController<Category, categoryDto.CreateCategoryDto, categoryDto.updateCategoryDto> {
    constructor(private categoryService: CategoryService) {
        super(categoryService);
    }   
}
