import { Injectable } from '@nestjs/common';
import { Prisma, Product } from 'generated/prisma';
import { BaseService } from 'src/base/baseService';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.to';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService extends BaseService<Product, CreateProductDTO, UpdateProductDTO> {
    constructor(private prisma: PrismaService) {
        super(prisma.product);
    }
}
