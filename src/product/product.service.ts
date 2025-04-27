import { Injectable } from '@nestjs/common';
import { Product } from 'node_modules/.prisma/client'; 
import { BaseService } from 'src/base/baseService';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService extends BaseService<Product, CreateProductDTO, UpdateProductDTO> {
    constructor(private prisma: PrismaService) {
        super(prisma.product);
    }
}