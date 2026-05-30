import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly service: TransactionsService,
  ) {}

  // ================= TRANSACTIONS
  @Post()
  create(@Body() dto: any) {
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

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.service.remove(id);
  }

  // ================= TYPES
  @Post('type')
  createType(@Body() dto: any) {
    return this.service.createType(dto);
  }

  @Get('type/all')
  findAllTypes() {
    return this.service.findAllTypes();
  }

  // ================= NATURES
  @Post('nature')
  createNature(@Body() dto: any) {
    return this.service.createNature(dto);
  }

  @Get('nature/all')
  findAllNatures() {
    return this.service.findAllNatures();
  }
}