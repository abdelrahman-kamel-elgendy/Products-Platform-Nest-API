import { Injectable } from '@nestjs/common';
import { Category } from 'node_modules/.prisma/client';
import { BaseService } from '../base/baseService';
import { PrismaService } from 'src/prisma/prisma.service';
import { updateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService extends BaseService<Category, CreateCategoryDto, updateCategoryDto> {
    constructor(private prisma: PrismaService) {
        super(prisma.category);
    }
}
