import { Body, Controller, Post, Put, Param, UseGuards } from '@nestjs/common';
import { LocalAuthenticationGuard } from 'src/auth/localAuthentication.guard';
import { CreateUserDto } from 'src/dto/user.dto';
import User from 'src/model/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/register')
  registration(@Body() body: CreateUserDto) {
    return this.usersService.registration(body);
  }

  @UseGuards(LocalAuthenticationGuard)
  @Post('/login')
  login(@Body() body: CreateUserDto) {
    return this.usersService.login(body);
  }

  @Put('/:id/change')
  changePassword(@Body() body: User, @Param('id') id: number) {
    return this.usersService.changePassword(body, id);
  }
}
