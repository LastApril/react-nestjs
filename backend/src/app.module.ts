import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersModule } from './customers/customers.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    CustomersModule,
    MongooseModule.forRoot('mongodb://localhost/dashboard'),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
