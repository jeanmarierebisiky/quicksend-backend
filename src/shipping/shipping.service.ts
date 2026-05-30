import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShippingDto } from './dto/create-shipping.dto';

@Injectable()
export class ShippingService {
  constructor(private prisma: PrismaService) {}

  // ================= CREATE (Type + Price)
  async create(dto: CreateShippingDto) {
    return this.prisma.shippingType.create({
      data: {
        code: dto.code,
        label: dto.label,

        // création prix associé
        prices: {
          create: {
            label: `${dto.code}-DEFAULT`,
            amount: dto.amount,
          },
        },
      },
      include: {
        prices: true,
      },
    });
  }

  // ================= FIND ALL
  findAll() {
    return this.prisma.shippingType.findMany({
      include: {
        prices: true,
        parcels: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // ================= FIND ONE
  async findOne(id: number) {
    const shipping =
      await this.prisma.shippingType.findUnique({
        where: { id },
        include: {
          prices: true,
          parcels: true,
          invoiceItems: true,
        },
      });

    if (!shipping) {
      throw new NotFoundException(
        `Shipping ${id} introuvable`,
      );
    }

    return shipping;
  }

  // ================= UPDATE TYPE ONLY
  update(id: number, dto: any) {
    return this.prisma.shippingType.update({
      where: { id },
      data: {
        code: dto.code,
        label: dto.label,
      },
    });
  }

  // ================= ADD PRICE (IMPORTANT)
  addPrice(shippingTypeId: number, amount: number) {
    return this.prisma.price.create({
      data: {
        shippingTypeId,
        label: 'MANUAL',
        amount,
      },
    });
  }

  // ================= DELETE
  remove(id: number) {
    return this.prisma.shippingType.delete({
      where: { id },
    });
  }
   // ================= search
  search(q: string) {
  return this.prisma.shippingType.findMany({
    where: {
      label: {
        contains: q,
        mode: 'insensitive',
      },
    },
  });
}
}