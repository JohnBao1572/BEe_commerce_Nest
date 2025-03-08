import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { createUserDto, loginUserDto } from './dto/user.Dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    private JwtService: JwtService
  ) { }

  async signup(CreateUserDto: createUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email: CreateUserDto.email
      }
    })

    if (user) {
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(CreateUserDto.password, salt)
    return await this.userRepository.save({ ...CreateUserDto, password: hashedPassword });
  }

  async login(LoginUserDto: { email: string, password: string }): Promise<any> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email: LoginUserDto.email
        },
        select: ['id', 'name', 'email', 'password', 'role']
      })
      if (!user) {
        throw new HttpException({ message: 'Email not found' }, HttpStatus.UNAUTHORIZED)
      }

      const Comparepassword = await bcrypt.compare(LoginUserDto.password, user.password);
      if (!Comparepassword) {
        throw new HttpException({ message: 'Invalid password' }, HttpStatus.BAD_REQUEST)
      }

      const accToken = await this.accToken(user)
      console.log("🔍 Generated Access Token:", accToken);
      
      const refreshToken = await this.ref_Token(user)

      return { //...user
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        accToken, refreshToken
      };
    } catch (error) {
      console.error(error);
      throw new HttpException({ message: 'Internal server error', error }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async accToken(user:UserEntity):Promise<string>{
    const payload = {id: user.id, email: user.email, password: user.password}
    const accessToken = await this.JwtService.sign(payload, {
      secret: process.env.Acc_Token,
      expiresIn: '1h'
    })

    return accessToken
  }

  async ref_Token(user:UserEntity):Promise<string>{
    const payload = {id: user.id, email: user.email, password: user.password}
    const refreshToken = await this.JwtService.sign(payload, {
      secret: process.env.Ref_Token,
      expiresIn: '7d'
    })

    return refreshToken
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  } 

  async findAll():Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number):Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({id})
    if(!user){
      throw new HttpException({message: 'Not found id user'}, HttpStatus.BAD_REQUEST)
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
