import { Controller, UseGuards } from '@nestjs/common';
import { BaseController } from '../base/base.controller';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Product } from '@prisma/client';
import { CreateProductDto, UpdateProductDto } from './product.dto';

@UseGuards(JwtAuthGuard)
@Controller('product')
export class ProductController extends BaseController<Product, CreateProductDto, UpdateProductDto> {
    constructor(private productService: ProductService) {
        super(productService);
    }
}