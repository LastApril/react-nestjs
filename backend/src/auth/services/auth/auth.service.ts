import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../../users/services/users/users.service';
import { comparePassword } from '../../../utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
    private configService: ConfigService,
  ) {}
  async validateUser(username: string, password: string) {
    const user = await this.userService.findUserByUsername(username);
    if (user) {
      const matched = await comparePassword(password, user.password);
      if (matched) {
        return user;
      }
      return null;
    }
    return null;
  }
}
