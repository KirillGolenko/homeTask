import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/model/user.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  createHash(login) {
    const signature = {
      user: login,
      iat: Math.floor(Date.now() / 1000) - 30,
    };
    const older_token = jwt.sign(signature, 'secret');
    return older_token;
  }

  randomInteger() {
    return Math.round(1 + Math.random() * (999999 - 1 + 1));
  }

  async registration(@Body() data) {
    const { user_name } = data;
    // data.id = this.randomInteger();
    const newPost = await this.usersRepository.create(data);
    await this.usersRepository.save(newPost);
    return { token: this.createHash(user_name), data: newPost };
  }

  async login(@Body() data) {
    const { user_name } = data;
    const user = await this.usersRepository.findOne({
      where: { user_name: user_name },
    });
    if (user) {
      return { token: this.createHash(user_name), data: user };
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async changePassword(@Body() data) {
    const { password } = data;
  }
}
