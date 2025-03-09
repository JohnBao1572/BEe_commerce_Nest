import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { Repository } from 'typeorm';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity) private readonly reviewRepository: Repository<ReviewEntity>,
    private readonly productService: ProductService
  ) { }

  async create(createReviewDto: CreateReviewDto, currentUser: UserEntity): Promise<ReviewEntity> {
    const product = await this.productService.findOne(createReviewDto.prodId)
    if(!product){
      throw new HttpException({message: 'Not found prod'}, HttpStatus.BAD_REQUEST)
    }

    let rev = await this.findOneByUAP(currentUser.id, createReviewDto.prodId);
    if (!rev) {
      rev = this.reviewRepository.create(createReviewDto)
      rev.addedBy = currentUser
      rev.prod = product
    } else{
      rev.ratings = createReviewDto.ratings;
      rev.comment = createReviewDto.comment;
    }

    return await this.reviewRepository.save(rev);
  }

  async findAll() :Promise<ReviewEntity[]> {
    return await this.reviewRepository.find();
  }

  async findAllRevOfPro(id:number):Promise<ReviewEntity[]>{
    // const getRevPro = await this.productService.findOne(id)
    return await this.reviewRepository.find({
      where: {prod: {id}},
      relations:{addedBy: true, prod:{category:true}}
    })
  }

  async findOne(id: number):Promise<ReviewEntity> {
    const rev = await this.reviewRepository.findOne({
      where:{
        id:id
      },
      relations: {addedBy: true, prod: {category: true}}
    })
    if(!rev){
      throw new HttpException({message: 'Not found rev by Id'}, HttpStatus.BAD_GATEWAY)
    }
    return rev;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  async remove(id: number):Promise<ReviewEntity> {
    const rev = await this.findOne(id)
    return this.reviewRepository.remove(rev);
  }

  async findOneByUAP(addedById: number, prodId: number): Promise<ReviewEntity | null> {
    const find = await this.reviewRepository.findOne({
      where: {
        addedBy: { id: addedById },
        prod: { id: prodId }
      },
      relations: {
        addedBy: true,
        prod:{category: true},
      },
      select:{
        addedBy: {
          name: true,
          email: true,
          role: true,
        },
      }
    })
    return find
  }

}

