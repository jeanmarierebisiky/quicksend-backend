import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  // ================= TRANSACTION CREATE
  create(dto: any) {
    return this.prisma.transaction.create({
      data: dto,
      include: {
        transactionType: true,
        transactionNature: true,
        user: true,
      },
    });
  }

  // ================= LIST TRANSACTIONS
  findAll() {
    return this.prisma.transaction.findMany({
      include: {
        transactionType: true,
        transactionNature: true,
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: number) {
    return this.prisma.transaction.findUnique({
      where: { id },
      include: {
        transactionType: true,
        transactionNature: true,
        user: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.transaction.delete({
      where: { id },
    });
  }

  // ======================================================
  // 💡 TRANSACTION TYPE
  // ======================================================

  createType(dto: any) {
    return this.prisma.transactionType.create({
      data: dto,
    });
  }

  findAllTypes() {
    return this.prisma.transactionType.findMany({
      include: {
        transactions: true,
      },
    });
  }

  // ======================================================
  // 💡 TRANSACTION NATURE
  // ======================================================

  createNature(dto: any) {
    return this.prisma.transactionNature.create({
      data: dto,
    });
  }

  findAllNatures() {
    return this.prisma.transactionNature.findMany({
      include: {
        transactions: true,
      },
    });
  }
}