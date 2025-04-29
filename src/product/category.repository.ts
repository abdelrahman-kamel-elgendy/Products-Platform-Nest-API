import { Injectable } from "@nestjs/common";
import { Product } from "@prisma/client";
import { BaseRepository } from "src/base/base.repository";
import * as categoryDto from "./product.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ProductRepository extends BaseRepository<Product, categoryDto.CreateProductDTO, categoryDto.UpdateProductDTO> {
    constructor(private prisma: PrismaService) {
        super(prisma.product)
    }
}