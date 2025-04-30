import { Injectable } from "@nestjs/common";
import { Category } from "@prisma/client";
import { BaseRepository } from "../base/base.repository";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCategoryDto, UpdateCategoryDto } from "./category.dto";

@Injectable()
export class CategoryRepository extends BaseRepository<Category, CreateCategoryDto, UpdateCategoryDto> {
    constructor(private prisma: PrismaService) {
        super(prisma.category);
    }
}