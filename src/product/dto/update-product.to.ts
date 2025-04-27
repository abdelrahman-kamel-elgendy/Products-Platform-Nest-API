import { IsString } from "class-validator";

export class UpdateProductDTO {
    @IsString()
    name?: string;

    @IsString()
    description?: string;

    price?: number;
    
    @IsString()
    categoryname?: string;
}