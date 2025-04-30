import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule], // This provides PrismaService
  controllers: [ProductController],
  providers: [ProductService, ProductRepository]
})
export class ProductModule {}
