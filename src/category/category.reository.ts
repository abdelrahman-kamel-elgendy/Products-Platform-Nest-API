import { Injectable } from "@nestjs/common";
import { Category } from "@prisma/client";
import { BaseRepository } from "src/base/base.repository";
import * as categoryDto from "./category.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CategoryRepository extends BaseRepository<Category, categoryDto.CreateCategoryDto, categoryDto.updateCategoryDto> {
    constructor(private prisma: PrismaService) {
        super(prisma.category);
    }
}