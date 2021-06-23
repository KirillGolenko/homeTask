import { Body, Controller, Post, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/register')
  registration(@Body() body) {
    return this.usersService.registration(body);
  }

  @Post('/login')
  login(@Body() body) {
    return this.usersService.login(body);
  }
}
