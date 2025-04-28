import { Controller, UseGuards } from '@nestjs/common';
import { BaseController } from '../base/base.controller';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { Product } from '../../node_modules/.prisma/client';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('product')
export class ProductController extends BaseController<Product, CreateProductDTO, UpdateProductDTO> {
    constructor(private productService: ProductService) {
        super(productService);
    }
}
