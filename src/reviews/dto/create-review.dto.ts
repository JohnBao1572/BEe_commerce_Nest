import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateReviewDto {
    @IsNotEmpty()
    @IsNumber({}, {message: 'ratings should be a number'})
    ratings: number;

    @IsNotEmpty()
    @IsString({message: 'comment should be a string'})
    comment: string;

    @IsNotEmpty()
    @IsNumber({}, {message: 'ProdID should be number'})
    prodId: number;

}
