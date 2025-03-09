import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { AuthenticationGuard } from 'src/util/guards/authentication.guard';
import { CurrentUser } from 'src/util/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { ReviewEntity } from './entities/review.entity';
import { AuthorizeGuard } from 'src/util/guards/authorization.guard';
import { Roles } from 'src/util/common/user-role';
import { AuthorizeRoles } from 'src/util/decorators/authorize-roles.decorator';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(AuthenticationGuard)
  @Post('add')
  async create(@Body() createReviewDto: CreateReviewDto, @CurrentUser() currentUser: UserEntity):Promise<ReviewEntity> {
    return await this.reviewsService.create(createReviewDto, currentUser);
  }

  @Get('getAll')
  async findAll(): Promise<ReviewEntity[]> {
    return await this.reviewsService.findAll();
  }

  @Get('getAllByPro')
  async getAllPro(@Body('prodId') prodId: number): Promise<ReviewEntity[]>{
    return await this.reviewsService.findAllRevOfPro(+prodId)
  }

  @UseGuards(AuthenticationGuard)
  @Get('getbyId/:id')
  async findOne(@Param('id') id: string):Promise<ReviewEntity> {
    return await this.reviewsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Delete(':id')
  remove(@Param('id') id: string):Promise<ReviewEntity> {
    return this.reviewsService.remove(+id);
  }
}
