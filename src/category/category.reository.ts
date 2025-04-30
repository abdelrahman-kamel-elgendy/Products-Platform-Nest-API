import { Injectable } from "@nestjs/common";
import { Category } from "@prisma/client";
import { BaseRepository } from "src/base/base.repository";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCategoryDto, UpdateCategoryDto } from "./category.dto";

@Injectable()
export class CategoryRepository extends BaseRepository<Category, CreateCategoryDto, UpdateCategoryDto> {
    constructor(private prisma: PrismaService) {
        super(prisma.category);
    }
}