import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    try {
      return await this.userService.validateUser(username, password);
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
}
