import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreateShippingMarkDto } from './dto/create-shipping-mark.dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  // ================= CREATE CUSTOMER
  create(dto: CreateCustomerDto) {
    return this.prisma.customer.create({
      data: {
        name: dto.name,
        firstname: dto.firstname,
        phone: dto.phone,
        email: dto.email,
        login: dto.login,
        password: dto.password,
      },
    });
  }

  // ================= GET ALL CUSTOMERS
  findAll() {
    return this.prisma.customer.findMany({
      include: {
        shippingMarks: true,
        invoices: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // ================= GET ONE CUSTOMER
  findOne(id: number) {
    return this.prisma.customer.findUnique({
      where: { id },
      include: {
        shippingMarks: {
          include: {
            parcels: true,
          },
        },
        invoices: true,
      },
    });
  }

  // ================= UPDATE
  update(id: number, dto: any) {
    return this.prisma.customer.update({
      where: { id },
      data: dto,
    });
  }

  // ================= DELETE
  remove(id: number) {
    return this.prisma.customer.delete({
      where: { id },
    });
  }

  // ======================================================
  // 📦 SHIPPING MARK
  // ======================================================

  createShippingMark(dto: CreateShippingMarkDto) {
    return this.prisma.shippingMark.create({
      data: {
        code: dto.code,
        customerId: dto.customerId,
      },
    });
  }

  findShippingMarks(customerId: number) {
    return this.prisma.shippingMark.findMany({
      where: { customerId },
      include: {
        parcels: true,
      },
    });
  }
async removeShippingMark(id: number) {
  const mark = await this.prisma.shippingMark.findUnique({
    where: { id },
    include: {
      parcels: true,
    },
  });

  if (!mark) {
    throw new Error('ShippingMark introuvable');
  }

  if (mark.parcels.length > 0) {
    throw new Error(
      'Impossible de supprimer: des colis sont liés',
    );
  }

  // 1. soft delete
  const updated = await this.prisma.shippingMark.update({
    where: { id },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
    },
  });

  // 2. audit log (après update)
  await this.prisma.auditLog.create({
    data: {
      entityType: 'ShippingMark',
      entityId: id.toString(),
      action: 'DELETE',
      description: 'Soft delete shipping mark',
    },
  });

  return updated;
}

}