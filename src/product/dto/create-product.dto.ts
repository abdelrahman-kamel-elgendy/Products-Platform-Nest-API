import { IsNotEmpty, IsString } from "class-validator";

export class CreateProductDTO {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    @IsString()
    categoryName: string;
}