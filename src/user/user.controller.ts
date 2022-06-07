import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { userDto } from './dto/user';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post('/reg')
  regUser(@Body() userDto: userDto) {
    return this.UserService.regUser(userDto);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/user')
  infoUser(@Req() req) {
    return this.UserService.userData(req);
  }
  @UseGuards(JwtAuthGuard)
  @Get('getAllManager')
  getAllManager() {
    return this.UserService.allManager();
  }
}
