import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { createUserDto } from './dto/user.Dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
     @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
  ) {}

  async signup (CreateUserDto:createUserDto): Promise<UserEntity>{
    const user = await this.userRepository.findOne({
      where:{
        email: CreateUserDto.email
      }
    })

    if(user){
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(CreateUserDto.password, salt)
    return await this.userRepository.save({...CreateUserDto, password: hashedPassword});
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
