import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CategoryRepository } from './category.reository';

@Module({
  imports: [PrismaModule], // This provides PrismaService
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
  exports: [CategoryRepository]
})
export class CategoryModule {}
