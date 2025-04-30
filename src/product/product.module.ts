import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { CategoryRepository } from 'src/category/category.reository';

@Module({
  imports: [PrismaModule], 
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, CategoryRepository]
})
export class ProductModule {}
