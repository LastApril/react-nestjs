import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateUserDto {
  _id: ObjectId;
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  role: string;

  name: string;
}
