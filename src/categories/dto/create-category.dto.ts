import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty({message: 'Not empty ti'})
    @IsString({message: 'Title should be a string'})
    title: string;

    @IsNotEmpty({message: 'Not empty desc'})
    @IsString({message: 'Desc should be string'})
    description: string;
}
