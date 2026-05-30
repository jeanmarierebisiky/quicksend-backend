import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';

@Controller('shipping')
export class ShippingController {
  constructor(
    private readonly shippingService: ShippingService,
  ) {}

  // ================= CREATE (ShippingType + Price)
  @Post()
  create(@Body() dto: CreateShippingDto) {
    return this.shippingService.create(dto);
  }

  // ================= GET ALL
  @Get()
  findAll() {
    return this.shippingService.findAll();
  }

  // ================= SEARCH (code / label)
  @Get('search')
  search(@Query('q') q?: string) {
    return this.shippingService.search(q ?? '');
  }

  // ================= GET ONE (ShippingType + prices)
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.shippingService.findOne(id);
  }

  // ================= UPDATE SHIPPING TYPE ONLY
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateShippingDto,
  ) {
    return this.shippingService.update(id, dto);
  }

  // ================= ADD PRICE (IMPORTANT BUSINESS FEATURE)
  @Post(':id/price')
  addPrice(
    @Param('id', ParseIntPipe) id: number,
    @Body('amount') amount: number,
  ) {
    return this.shippingService.addPrice(id, amount);
  }

  // ================= DELETE SHIPPING TYPE
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.shippingService.remove(id);
  }
}