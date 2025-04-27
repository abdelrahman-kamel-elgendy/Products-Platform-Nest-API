import { IsNotEmpty, IsString } from "class-validator";

export class updateCategoryDto {
    @IsString({ message: 'Name must be a string.' })
    @IsNotEmpty({ message: 'Name is required and cannot be empty.' })
    name: string;

    @IsString({ message: 'Description must be a string.' })
    description: string;

    isActive: boolean;
}