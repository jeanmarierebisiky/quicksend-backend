import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuditDto } from './dto/create-audit.dto';
import { UpdateAuditDto } from './dto/update-audit.dto';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  // CREATE
  create(dto: CreateAuditDto) {
    return this.prisma.auditLog.create({
      data: {
        userId: dto.userId,
        entityType: dto.entityType,
        entityId: dto.entityId,
        action: dto.action,
        description: dto.description,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        metadata: dto.metadata,
        ipAddress: dto.ipAddress,
      },
    });
  }

  // LISTE AVEC PAGINATION
  findAll(params?: {
    page?: number;
    limit?: number;
    action?: string;
    entityType?: string;
  }) {
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 20;

    return this.prisma.auditLog.findMany({
      skip: (page - 1) * limit,
      take: limit,

      where: {
        ...(params?.action && {
          action: params.action,
        }),

        ...(params?.entityType && {
          entityType: params.entityType,
        }),
      },

      include: {
        user: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // DETAIL
  async findOne(id: number) {
    const audit = await this.prisma.auditLog.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    if (!audit) {
      throw new NotFoundException(`Audit ${id} introuvable`);
    }

    return audit;
  }

  // UPDATE
  update(id: number, dto: UpdateAuditDto) {
    return this.prisma.auditLog.update({
      where: { id },
      data: dto,
    });
  }

  // DELETE
  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.auditLog.delete({
      where: { id },
    });
  }
}
