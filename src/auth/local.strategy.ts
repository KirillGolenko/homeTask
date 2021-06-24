import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import User from 'src/model/user.entity';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private AuthService: AuthService) {
    super({
      usernameField: 'user_name',
    });
  }
  async validate(email: string, password: string): Promise<User> {
    return this.AuthService.getAuthenticatedUser(email, password);
  }
}
