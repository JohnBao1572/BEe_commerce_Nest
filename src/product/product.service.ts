import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Not, Repository } from 'typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { CurrentUser } from 'src/util/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { title } from 'process';
import { get } from 'http';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,

    private readonly categoryService: CategoriesService
  ){}

  async create(createProductDto: CreateProductDto, currentUser: UserEntity): Promise<ProductEntity> {
    const category = await this.categoryService.findOne(+createProductDto.categoryId);
    const addProduct = await this.productRepository.create(createProductDto);
    addProduct.category = category;
    addProduct.addedBy = currentUser

    return await this.productRepository.save(addProduct);
  }

  async findAll(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    const getProductId = await this.productRepository.find({
      where:{
        id: id
      },
      // relations:['category'],
      relations:{addedBy:true, category: true},
      select:{
        addedBy:{
          name: true,
          role: true,
        },
        category:{
          title: true
        }
      }
    })
    if(!getProductId){
      throw new NotFoundException('Product ID not found')
    }

    return getProductId;
  }

  async update(id: number, updateProductDto:Partial <UpdateProductDto>, currentUser: UserEntity): Promise<ProductEntity>{
    const product = await this.productRepository.findOne({
      where: {
        id:id
      },

      relations: {category: true, addedBy:true},
      select:{
        addedBy:{
          name: true,
          role: true,
        },
        category:{
          title: true,
        }
      }
    });
    if(!product){
      throw new NotFoundException('Not found to update')
    }

    Object.assign(product,updateProductDto);
    product.addedBy = currentUser;
    if(updateProductDto.categoryId){
      const category = await this.categoryService.findOne(+updateProductDto.categoryId);

      product.category = category
    }

    return await this.productRepository.save(product);
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
