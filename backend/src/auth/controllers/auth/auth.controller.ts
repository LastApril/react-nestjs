import { Controller, Get, Post, Req, Session, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticatedGuard, LocalAuthGuard } from '../../utils/LocalGuard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login() {
    return null;
  }

  @UseGuards(AuthenticatedGuard)
  @Post('logout')
  async logout(@Req() req: Request) {
    return req.logOut();
  }

  @Get()
  async getAuthSession(@Session() session: Record<string, any>) {
    // console.log(session);
    // console.log(session.id);
    session.auth = true;
    return session;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('status')
  async getAuthStatus(@Req() req: Request) {
    // console.log(req.user);
    return req.user;
  }
}
