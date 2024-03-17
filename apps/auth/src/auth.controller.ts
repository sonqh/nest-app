import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from '../../../libs/common/src/decorators/current-user.decorator';
import { UserDocument } from './users/models/user.model';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: UserDocument, @Res() response: Response) {
    const jwt = await this.authService.login(user, response);
    response.send(jwt);
  }

  // @UseGuards(JwtAuthGuard)
  // // @MessagePattern('authenticate')
  // async authenticate(@Payload() data: any) {
  //   return data.user;
  // }
}
