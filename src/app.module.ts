import { Module } from '@nestjs/common';
import { ShippingModule } from './shipping/shipping.module';
import { AuditModule } from './audit/audit.module';
import { TransactionsModule } from './transactions/transactions.module';
import { InvoicesModule } from './invoices/invoices.module';
import { ParcelsModule } from './parcels/parcels.module';
import { CustomersModule } from './customers/customers.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    CustomersModule,
    ParcelsModule,
    InvoicesModule,
    TransactionsModule,
    AuditModule,
    ShippingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
