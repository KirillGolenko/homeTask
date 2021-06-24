import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { LocalAuthenticationGuard } from './localAuthentication.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthService) {}

  @Post('register')
  async register(@Body() registrationData) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Req() request, @Res() response: Response) {
    const { user } = request;
    const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.send(user);
  }
}
