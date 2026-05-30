import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateAuditDto } from './dto/create-audit.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // ================= CREATE USER
create(dto: CreateUserDto) {
  return this.prisma.user.create({
    data: {
      name: dto.name!,
      login: dto.login,
      password: dto.password,
      role: dto.role,
    },
  });
}

  // ================= FIND ALL USERS
  findAll() {
    return this.prisma.user.findMany({
      include: {
        transactions: true,
        invoices: true,
        auditLogs: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // ================= FIND ONE USER
  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        transactions: true,
        invoices: true,
        auditLogs: true,
      },
    });
  }

  // ================= UPDATE USER
  update(id: number, dto: any) {
    return this.prisma.user.update({
      where: { id },
      data: dto,
    });
  }

  // ================= DELETE USER
  remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  // ======================================================
  // 📜 AUDIT LOG (lié au user)
  // ======================================================

  createAudit(dto: CreateAuditDto) {
    return this.prisma.auditLog.create({
      data: {
        userId: dto.userId,
        entityType: dto.entityType,
        entityId: dto.entityId,
        action: dto.action,
        description: dto.description,
        metadata: dto.metadata,
        ipAddress: dto.ipAddress,
      },
    });
  }

  findAuditLogs(userId: number) {
    return this.prisma.auditLog.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}