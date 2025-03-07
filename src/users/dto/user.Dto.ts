import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class createUserDto{
    @IsNotEmpty({message: 'Name is required'})
    @IsString({message: 'Name should be a string'})
    name: string;

    @IsNotEmpty()
    @IsEmail({}, {message: 'Email should be a valid email'})
    email: string;

    @IsNotEmpty()
    @MinLength(10, {message: 'Password should be at least 10 characters'})
    password:string
} 