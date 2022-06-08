import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { UsersService } from '../users/services/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schema/user.schema';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './utils/LocalStrategy';
import { ConfigModule } from '@nestjs/config';
import { SessionSerializer } from './utils/SessionSerializer';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ConfigModule,
  ],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
    LocalStrategy,
    SessionSerializer,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
