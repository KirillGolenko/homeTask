import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import User from './model/user.entity';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userid } = req.body;
    const user = await this.userRepository.findOne({
      where: { id: userid },
    });
    if (user) {
      next();
    } else {
      throw new HttpException('You are not registered!', HttpStatus.NOT_FOUND);
    }
  }
}
