import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(CategoryEntity) private readonly categoryEntity: Repository<CategoryEntity>) { }

  async create(createCategoryDto: CreateCategoryDto, currentUser: UserEntity): Promise<CategoryEntity> {
    const createCat = await this.categoryEntity.create(createCategoryDto)
    createCat.addedBy = currentUser
    return this.categoryEntity.save(createCat);
  }

  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoryEntity.find();
  }

  async findOne(id: number): Promise<CategoryEntity> {
    const findOneCat = await this.categoryEntity.findOne({
      where: { id: id },
      relations: { addedBy: true },
      select: {
        addedBy: {
          name: true,
          email: true
        }
      }
    })
    if (!findOneCat) {
      throw new HttpException({ message: 'Not found cat id' }, HttpStatus.BAD_REQUEST)
    }
    return findOneCat;
  }

  async update(id: number, fields: Partial<UpdateCategoryDto>): Promise<CategoryEntity> {
    const upCat = await this.findOne(id);
    if (!upCat) {
      throw new HttpException({ message: 'Not found' }, HttpStatus.BAD_REQUEST)
    }
    Object.assign(upCat, fields)

    return await this.categoryEntity.save(upCat);
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
