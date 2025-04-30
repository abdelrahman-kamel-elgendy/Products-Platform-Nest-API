import { IsNotEmpty, IsString } from "class-validator";

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    @IsString()
    categoryId: string;
}

export class UpdateProductDto {
    @IsString()
    name?: string;

    @IsString()
    description?: string;

    price?: number;
    
    categoryId?: String;

    isActive?: boolean;
}