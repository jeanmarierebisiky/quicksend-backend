import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateParcelDto } from './dto/create-parcel.dto';
import { UpdateParcelDto } from './dto/update-parcel.dto';

@Injectable()
export class ParcelsService {
  constructor(private prisma: PrismaService) {}

  // ================= CREATE PARCEL
  create(dto: CreateParcelDto) {
    return this.prisma.parcel.create({
      data: {
        trackingNumber: dto.trackingNumber,
        weight: dto.weight,
        description: dto.description,

        dateExp: dto.dateExp,
        dateArriv: dto.dateArriv,

        shippingMarkId: dto.shippingMarkId,
        statusId: dto.statusId,
        shippingTypeId: dto.shippingTypeId,
      },

      include: {
        shippingMark: true,
        status: true,
        shippingType: true,
      },
    });
  }

  // ================= FIND ALL (pagination + filter)
  findAll(params: {
    page: number;
    limit: number;
    statusId?: number;
  }) {
    const { page, limit, statusId } = params;

    return this.prisma.parcel.findMany({
      skip: (page - 1) * limit,
      take: limit,

      where: statusId
        ? { statusId }
        : undefined,

      include: {
        shippingMark: {
          include: {
            customer: true,
          },
        },
        status: true,
        shippingType: true,
        packages: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // ================= FIND ONE
  async findOne(id: number) {
    const parcel =
      await this.prisma.parcel.findUnique({
        where: { id },

        include: {
          shippingMark: {
            include: {
              customer: true,
            },
          },
          status: true,
          shippingType: true,
          packages: true,
          invoiceItems: true,
        },
      });

    if (!parcel) {
      throw new NotFoundException(
        `Parcel ${id} introuvable`,
      );
    }

    return parcel;
  }

  // ================= UPDATE (SAFE ONLY)
  update(id: number, dto: UpdateParcelDto) {
    return this.prisma.parcel.update({
      where: { id },

      data: {
        statusId: dto.statusId,
        dateExp: dto.dateExp,
        dateArriv: dto.dateArriv,
        description: dto.description,
      },
    });
  }

  // ================= DELETE
  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.parcel.delete({
      where: { id },
    });
  }

  // ================= SEARCH TRACKING NUMBER
  search(q: string) {
    return this.prisma.parcel.findMany({
      where: {
        trackingNumber: {
          contains: q,
          mode: 'insensitive',
        },
      },

      include: {
        status: true,
        shippingType: true,
      },
    });
  }

  // ======================================================
  // 📦 PACKAGES
  // ======================================================

  createPackage(parcelId: number, dto: any) {
    return this.prisma.package.create({
      data: {
        parcelId,
        statusId: dto.statusId,
        shippingType: dto.shippingType,
        weight: dto.weight,
        nomBox: dto.nomBox,
        dateExp: dto.dateExp,
        dateArriv: dto.dateArriv,
        motifReturn: dto.motifReturn,
        packageType: dto.packageType,
        packingWeightKg: dto.packingWeightKg,
        packingWeightPercentage:
          dto.packingWeightPercentage,
      },
    });
  }

  findPackages(parcelId: number) {
    return this.prisma.package.findMany({
      where: { parcelId },

      include: {
        status: true,
      },
    });
  }

  // ======================================================
  // 📊 STATUS CHANGE (LOGIC READY FOR AUDIT + TRANSACTIONS)
  // ======================================================

  changeStatus(parcelId: number, statusId: number) {
    return this.prisma.parcel.update({
      where: { id: parcelId },

      data: {
        statusId,
      },

      include: {
        status: true,
      },
    });
  }
}