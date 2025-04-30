import { Controller, UseGuards } from '@nestjs/common';
import { BaseController } from '../base/base.controller';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Product } from '@prisma/client';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';

@UseGuards(JwtAuthGuard)
@Controller('product')
export class ProductController extends BaseController<Product, CreateProductDTO, UpdateProductDTO> {
    constructor(private productService: ProductService) {
        super(productService);
    }
}