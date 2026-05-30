import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  // ================= CREATE INVOICE
  async create(dto: CreateInvoiceDto) {
    return this.prisma.invoice.create({
      data: {
        invoiceNumber: dto.invoiceNumber,
        invoiceDate: new Date(dto.invoiceDate),

        customerId: dto.customerId,
        statusId: dto.statusId,
        paymentMethodId: dto.paymentMethodId,
        createdById: dto.createdById,

        discountAmount: dto.discountAmount,
        extraFee: dto.extraFee,

        receverName: dto.receverName,
        receverContact: dto.receverContact,
        paymentReference: dto.paymentReference,

        invoiceItems: {
          create: dto.items.map((item) => {
            const data: any = {
              shippingType: {
                connect: { id: item.shippingTypeId },
              },

              trackingNumber: item.trackingNumber,
              boxName: item.boxName ?? null,
              price: item.price,
              packageType: item.packageType ?? null,
              weightKg: item.weightKg,
              packingWeightKg: item.packingWeightKg ?? null,
              packingWeightPercentage:
                item.packingWeightPercentage ?? null,
              billableWeightKg: item.billableWeightKg,
            };

            if (item.parcelId) {
              data.parcel = {
                connect: { id: item.parcelId },
              };
            }

            return data;
          }),
        },
      },

      include: {
        invoiceItems: true,
        customer: true,
        status: true,
        paymentMethod: true,
      },
    });
  }

  // ================= FIND ALL
  findAll() {
    return this.prisma.invoice.findMany({
      include: {
        invoiceItems: true,
        customer: true,
        status: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // ================= FIND ONE
  findOne(id: number) {
    return this.prisma.invoice.findUnique({
      where: { id },
      include: {
        invoiceItems: true,
        customer: true,
        status: true,
      },
    });
  }

  // ================= DELETE (cascade safe)
  async remove(id: number) {
    await this.prisma.invoiceItem.deleteMany({
      where: { invoiceId: id },
    });

    return this.prisma.invoice.delete({
      where: { id },
    });
  }
}