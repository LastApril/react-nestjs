import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from '../../dtos/CreateUsers.dto';
import { UpdateUserDto } from '../../dtos/UpdateUsers.dto';
import { UsersService } from '../../services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createUser(@Res() response, @Body() user: CreateUserDto) {
    try {
      const newUser = await this.userService.create(user);
      return response.status(HttpStatus.CREATED).json({
        newUser,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User not created',
        error: 'Bad Request',
      });
    }
  }

  @Get(':id')
  async getUser(@Res() response, @Param('id') userId: string) {
    try {
      const foundUser = await this.userService.find(userId);
      if (!foundUser) {
        throw new NotFoundException(`User #${userId} not found`);
      }
      return response.status(HttpStatus.OK).json({
        message: 'User data found successfully',
        foundUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getUsers(@Res() response) {
    try {
      const users = await this.userService.findAll();
      if (!users || users.length === 0) {
        throw new NotFoundException('Users data not found');
      }
      return response.status(HttpStatus.OK).json({
        message: 'All users data found successfully',
        users,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put(':id')
  async updateUser(
    @Res() response,
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const updatedUser = await this.userService.update(updateUserDto, userId);
      if (!updatedUser) {
        throw new NotFoundException(`User #${userId} not found`);
      }
      return response.status(HttpStatus.OK).json({
        message: 'User data updated successfully',
        updatedUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete(':id')
  async deleteCustomer(@Res() response, @Param('id') userId: string) {
    try {
      const deletedUser = await this.userService.delete(userId);
      if (!deletedUser) {
        throw new NotFoundException(`User #${userId} not found`);
      }
      return response.status(HttpStatus.OK).json({
        message: 'User data deleted successfully',
        deletedUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
