/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';

import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CreateShippingMarkDto } from './dto/create-shipping-mark.dto';

@Controller('customers')
export class CustomersController {
  constructor(
    private readonly service: CustomersService,
  ) {}

  // ================= CUSTOMER

  @Post()
  create(@Body() dto: CreateCustomerDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCustomerDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.service.remove(id);
  }

  // ================= SHIPPING MARK

  @Post(':id/shipping-mark')
  createMark(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateShippingMarkDto,
  ) {
    return this.service.createShippingMark({
      ...dto,
      customerId: id,
    });
  }

  @Get(':id/shipping-mark')
  findMarks(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.service.findShippingMarks(id);
  }
}