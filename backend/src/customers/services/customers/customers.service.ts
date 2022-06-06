import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDto } from '../../dtos/CreateCustomer.dto';
import { UpdateCustomerDto } from '../../dtos/UpdateCustomer.dto';
import { Customer, CustomerDocument } from '../../schema/customer.schema';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const createdCustomer = new this.customerModel(createCustomerDto);
    return createdCustomer.save();
  }

  async find(id: string): Promise<Customer> {
    return this.customerModel.findById(id);
  }

  async findAll(): Promise<Customer[]> {
    return this.customerModel.find().exec();
  }

  async update(
    updateCustomerDto: UpdateCustomerDto,
    id: string,
  ): Promise<Customer> {
    return this.customerModel.findByIdAndUpdate(id, updateCustomerDto, {
      new: true,
    });
  }

  async delete(id: string): Promise<Customer> {
    return this.customerModel.findByIdAndDelete(id);
  }
}
