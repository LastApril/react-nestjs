import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersModule } from './customers/customers.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    CustomersModule,
    MongooseModule.forRoot('mongodb://localhost/dashboard'),
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule.register({
      session: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
