import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';
import { CurrentUser } from '../../../../libs/common/src/decorators/current-user.decorator';
import { UserDocument } from './models/user.model';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    console.log("createUserDto == ", createUserDto)
    return this.userService.createUser(createUserDto);
  }

  @Get('all')
  async findAll() {
    console.log("run")
    return this.userService.findAll();
  }


  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() user: UserDocument) {
    // const userTest = this.userService.getUser(user)
    console.log("user return -- ", user)
    return user;
  }
}
