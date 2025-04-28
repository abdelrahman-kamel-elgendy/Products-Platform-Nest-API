import { Controller, UseGuards } from '@nestjs/common';
import { BaseController } from '../base/base.controller'; 
import { CreateCategoryDto } from './dto/create-category.dto';
import { updateCategoryDto } from './dto/update-category.dto';
import { Category } from '../../node_modules/.prisma/client';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('category')
export class CategoryController extends BaseController<Category, CreateCategoryDto, updateCategoryDto> {
    constructor(private categoryService: CategoryService) {
        super(categoryService);
    }   
}
