import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator";


export class CreateProductDto {
    @IsNotEmpty()
    @IsString({message: 'name should be string'})
    name: string;

    @IsNotEmpty({message: 'Not emtpy'})
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber({maxDecimalPlaces:2})
    @IsPositive()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0, {message: 'stock can not negative'})
    stock: number;

    @IsNotEmpty()
    @IsArray({message: 'images should be in array'})
    img: string[];

    @IsNotEmpty()
    @IsNumber({}, {message: 'Cat should be a number'})
    category: number
}
