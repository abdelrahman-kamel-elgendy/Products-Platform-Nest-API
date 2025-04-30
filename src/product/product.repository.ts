import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { BaseRepository } from '../base/base.repository';
import { PrismaService } from '../prisma/prisma.service';
import {  CreateProductDto, UpdateProductDto } from './product.dto';

@Injectable()
export class ProductRepository extends BaseRepository<Product, CreateProductDto, UpdateProductDto> {
  constructor(private prisma: PrismaService) {
    super(prisma.product);
  }
}
