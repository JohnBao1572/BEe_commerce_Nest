import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { createUserDto, loginUserDto } from './dto/user.Dto';
import { CurrentUser } from 'src/util/decorators/current-user.decorator';
import { AuthenticationGuard } from 'src/util/guards/authentication.guard';
import { AuthorizeRoles } from 'src/util/decorators/authorize-roles.decorator';
import { AuthorizeGuard } from 'src/util/guards/authorization.guard';
import { Roles } from 'src/util/common/user-role';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('signup')
  async signup(@Body() CreateUserDto: createUserDto): Promise<UserEntity> {
    return await this.usersService.signup(CreateUserDto);
  }

  @Post('login')
  async login(@Body() LoginUserDto: loginUserDto): Promise<any> {
    return await this.usersService.login(LoginUserDto)
  }

  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Get('getAllUser')
  async findAll(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @Get('get/:id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @UseGuards(AuthenticationGuard)
  @Get('me')
  getProfile(@CurrentUser() currentUser: UserEntity) {
    return currentUser
  }
}
