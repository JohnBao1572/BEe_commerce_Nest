import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @IsOptional()
    @IsString({ message: 'Title should be a string' })
    title: string;

    @IsOptional()
    @IsString({ message: 'Desc should be string' })
    description: string;
}
