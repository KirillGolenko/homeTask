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

  async registration(@Body() data) {
    const { user_name } = data;
    const newUser = await this.usersRepository.create(data);
    await this.usersRepository.save(newUser);
    return { token: this.createHash(user_name), data: newUser };
  }

  async login(@Body() data) {
    const { user_name, password } = data;
    const user = await this.usersRepository.findOne({
      where: { user_name: user_name, password: password },
    });
    if (user) {
      return { token: this.createHash(user_name), data: user };
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async changePassword(data, id) {
    const { password } = data;
    try {
      await this.usersRepository.update(id, { password: password });
    } catch (error) {
      throw new HttpException('Wrong data', HttpStatus.NOT_FOUND);
    }
    const updatedPost = await this.usersRepository.findOne({
      where: { id: id },
    });
    if (updatedPost) {
      return updatedPost;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
}
