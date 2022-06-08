import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { response } from 'express';
import { AuthenticatedGuard } from '../../../auth/utils/LocalGuard';
import { RequestCustom } from '../../../types/User';
import { UpdateCustomerDto } from '../../dtos/UpdateCustomer.dto';
import { Customer } from '../../schema/customer.schema';
import { CustomersService } from '../../services/customers/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customerService: CustomersService) {}

  @UseGuards(AuthenticatedGuard)
  @Post()
  async createCustomer(
    @Res() response,
    @Body() customer: Customer,
    @Req() request: RequestCustom,
  ) {
    if (request.user.role === 'admin') {
      try {
        const newCustomer = await this.customerService.create(customer);
        return response.status(HttpStatus.CREATED).json({
          newCustomer,
        });
      } catch (err) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: 400,
          message: 'Error: Customer not created',
          error: 'Bad Request',
        });
      }
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  async getCustomer(@Res() response, @Param('id') customerId: string) {
    try {
      const foundCustomer = await this.customerService.find(customerId);
      if (!foundCustomer) {
        throw new NotFoundException(`Customer #${customerId} not found`);
      }
      return response.status(HttpStatus.OK).json({
        message: 'Customer data found successfully',
        foundCustomer,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Get()
  async getCustomers(@Res() response) {
    try {
      const customers = await this.customerService.findAll();
      if (!customers || customers.length === 0) {
        throw new NotFoundException('Customers data not found');
      }
      return response.status(HttpStatus.OK).json({
        message: 'All customers data found successfully',
        customers,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Put(':id')
  async updateCustomer(
    @Res() response,
    @Param('id') customerId: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
    @Req() request: RequestCustom,
  ) {
    if (request.user.role === 'admin') {
      try {
        const updatedCustomer = await this.customerService.update(
          updateCustomerDto,
          customerId,
        );
        if (!updatedCustomer) {
          throw new NotFoundException(`Customer #${customerId} not found`);
        }
        return response.status(HttpStatus.OK).json({
          messsage: 'Customer data updated successfully',
          updatedCustomer,
        });
      } catch (err) {
        return response.status(err.status).json(err.response);
      }
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  async deleteCustomer(
    @Res() response,
    @Param('id') customerId: string,
    @Req() request: RequestCustom,
  ) {
    if (request.user.role === 'admin') {
      try {
        const deletedCustomer = await this.customerService.delete(customerId);
        if (!deletedCustomer) {
          throw new NotFoundException(`Customer #${customerId} not found`);
        }
        return response.status(HttpStatus.OK).json({
          message: 'Customer data deleted successfully',
          deletedCustomer,
        });
      } catch (err) {
        return response.status(err.status).json(err.response);
      }
    }
  }
}
