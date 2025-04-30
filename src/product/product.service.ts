import { Injectable } from '@nestjs/common';
import { Product } from '../../node_modules/.prisma/client'; 
import { BaseService } from '../base/baseService';
import * as productDto from "./product.dto";
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService extends BaseService<Product, productDto.CreateProductDTO, productDto.UpdateProductDTO> {
    constructor(protected productRrepository: ProductRepository) {
        super(productRrepository);
    }
}