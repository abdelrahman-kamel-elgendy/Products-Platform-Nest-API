import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { BaseRepository } from 'src/base/base.repository';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';

@Injectable()
export class ProductRepository extends BaseRepository<Product, CreateProductDTO, UpdateProductDTO> {
  constructor(private prisma: PrismaService) {
    super(prisma.product);
  }
}
