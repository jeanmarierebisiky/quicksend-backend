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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateAuditDto } from './dto/create-audit.dto';
@Controller('users')
export class UsersController {
  constructor(
    private readonly service: UsersService,
  ) {}

  // ================= USERS
  @Post()
  create(@Body() dto: CreateUserDto) {
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
    @Body() dto: any,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.service.remove(id);
  }

  // ======================================================
  //  AUDIT LOG
  // ======================================================

  @Post(':id/audit')
  createAudit(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateAuditDto,
  ) {
    return this.service.createAudit({
      ...dto,
      userId: id,
    });
  }

  @Get(':id/audit')
  findAudit(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.service.findAuditLogs(id);
  }
}