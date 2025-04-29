import { isEmail, IsEmail, IsNotEmpty, IsString } from "class-validator";


export class CreateUserDTO {
    @IsString({ message: 'Email must be a string' })
    @IsEmail()  
    @IsNotEmpty({ message: 'Email is required' })  
    email: string;

    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password is required' })
    password: string;

    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password confirmation is required' })
    passwordConfirmation: string;

    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsString({ message: 'Role must be a string' })
    role?: string;
}

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
