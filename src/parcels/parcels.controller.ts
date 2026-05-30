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
import { ParcelsService } from './parcels.service';
import { CreateParcelDto } from './dto/create-parcel.dto';
import { UpdateParcelDto } from './dto/update-parcel.dto';

@Controller('parcels')
export class ParcelsController {
  constructor(
    private readonly parcelsService: ParcelsService,
  ) {}

  // ================= CREATE PARCEL
  @Post()
  create(@Body() dto: CreateParcelDto) {
    return this.parcelsService.create(dto);
  }

  // ================= GET ALL (pagination + filter)
  @Get()
  findAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('statusId') statusId?: string,
  ) {
    return this.parcelsService.findAll({
      page: Number(page),
      limit: Number(limit),
      statusId: statusId
        ? Number(statusId)
        : undefined,
    });
  }

  // ================= SEARCH tracking number
  @Get('search')
  search(@Query('q') q?: string) {
    return this.parcelsService.search(q ?? '');
  }

  // ================= GET ONE PARCEL
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.parcelsService.findOne(id);
  }

  // ================= UPDATE PARCEL (status + dates only)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateParcelDto,
  ) {
    return this.parcelsService.update(id, dto);
  }

  // ================= DELETE PARCEL
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.parcelsService.remove(id);
  }

  // ======================================================
  // 📦 PACKAGE (sous-colis)
  // ======================================================

  @Post(':id/packages')
  createPackage(
    @Param('id', ParseIntPipe) parcelId: number,
    @Body() dto: any,
  ) {
    return this.parcelsService.createPackage(
      parcelId,
      dto,
    );
  }

  @Get(':id/packages')
  findPackages(
    @Param('id', ParseIntPipe) parcelId: number,
  ) {
    return this.parcelsService.findPackages(parcelId);
  }

  // ======================================================
  // 📊 STATUS HISTORY / CHANGE STATUS
  // ======================================================

  @Patch(':id/status/:statusId')
  changeStatus(
    @Param('id', ParseIntPipe) parcelId: number,
    @Param('statusId', ParseIntPipe) statusId: number,
  ) {
    return this.parcelsService.changeStatus(
      parcelId,
      statusId,
    );
  }
}