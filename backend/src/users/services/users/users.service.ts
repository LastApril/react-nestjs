import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { encodePassword } from '../../../utils/bcrypt';
import { CreateUserDto } from '../../dtos/CreateUsers.dto';
import { UpdateUserDto } from '../../dtos/UpdateUsers.dto';
import { User, UserDocument } from '../../schema/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const password = await encodePassword(createUserDto.password);
    const _id = new Types.ObjectId();
    const createdUser = new this.userModel({ ...createUserDto, _id, password });
    return createdUser.save();
  }

  async find(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async update(updateUserDto: UpdateUserDto, id: string): Promise<User> {
    if (updateUserDto.password) {
      const password = await encodePassword(updateUserDto.password);
      return this.userModel.findByIdAndUpdate(
        id,
        { ...updateUserDto, password },
        { new: true },
      );
    }
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }

  async findUserByUsername(userName: string): Promise<User> {
    return this.userModel.findOne({ username: userName });
  }

  async findUserById(userId: ObjectId): Promise<User> {
    return this.userModel.findById(userId);
  }
}
