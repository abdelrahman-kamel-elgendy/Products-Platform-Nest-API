import { Controller, UseGuards } from '@nestjs/common';
import { BaseController } from '../base/base.controller'; 
import { Category } from '../../node_modules/.prisma/client';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';

@UseGuards(JwtAuthGuard)
@Controller('category')
export class CategoryController extends BaseController<Category, CreateCategoryDto, UpdateCategoryDto> {
    constructor(private categoryService: CategoryService) {
        super(categoryService);
    }   
}
