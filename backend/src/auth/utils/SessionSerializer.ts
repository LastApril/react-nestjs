import { Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '../../users/schema/user.schema';
import { UsersService } from '../../users/services/users/users.service';

export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('USER_SERVICE') private readonly usersService: UsersService,
  ) {
    super();
  }
  serializeUser(user: User, done: (err, user: User) => void) {
    // console.log('Serialize user');
    done(null, user);
  }

  async deserializeUser(user: User, done: (err, user: User) => void) {
    // console.log('Deserialize user');
    // console.log(user._id);
    const userDB = await this.usersService.findUserById(user._id);
    // console.log(userDB);
    return userDB ? done(null, userDB) : done(null, null);
  }
}
