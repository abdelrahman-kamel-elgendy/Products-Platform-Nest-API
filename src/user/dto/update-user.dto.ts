import { IsEAN, IsEmail, IsString } from "class-validator";

export class UpdateUserDTO {
    @IsString()
    name?: string;

    @IsString()
    @IsEmail()
    email?: string;

    @IsString()
    password?: string;

    @IsString()
    role?: string;

    @IsString()
    IsActive?: string;
}