import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seed start...')

  // =====================
  // USERS
  // =====================
  const adminPassword = await bcrypt.hash('admin123', 10)
  const userPassword = await bcrypt.hash('user123', 10)

  const admin = await prisma.user.create({
    data: {
      name: 'Admin System',
      login: 'admin',
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  const user = await prisma.user.create({
    data: {
      name: 'Simple User',
      login: 'user',
      password: userPassword,
      role: 'USER',
    },
  })

  // =====================
  // CUSTOMERS
  // =====================
  const customer = await prisma.customer.create({
    data: {
      name: 'Rakoto',
      firstname: 'Jean',
      phone: '+261340000000',
      email: 'jean.rakoto@gmail.com',
      login: 'rakoto.jean',
      password: await bcrypt.hash('client123', 10),
    },
  })

  // =====================
  // SHIPPING TYPES
  // =====================
  const air = await prisma.shippingType.create({
    data: {
      code: 'AIR',
      label: 'Transport aérien',
    },
  })

  const sea = await prisma.shippingType.create({
    data: {
      code: 'SEA',
      label: 'Transport maritime',
    },
  })

  // =====================
  // SHIPPING MARK
  // =====================
  const mark = await prisma.shippingMark.create({
    data: {
      code: 'MARK-001',
      customerId: customer.id,
    },
  })

  // =====================
  // PARCEL STATUS
  // =====================
  const pending = await prisma.parcelStatus.create({
    data: {
      code: 'PENDING',
      label: 'En attente',
    },
  })

  const delivered = await prisma.parcelStatus.create({
    data: {
      code: 'DELIVERED',
      label: 'Livré',
    },
  })

  // =====================
  // PARCELS
  // =====================
  const parcel = await prisma.parcel.create({
    data: {
      trackingNumber: 'TRK-0001-MG',
      weight: 12.5,
      shippingMarkId: mark.id,
      statusId: pending.id,
      shippingTypeId: air.id,
      description: 'Colis électronique',
      dateExp: new Date(),
    },
  })

  // =====================
  // TRANSACTION TYPES
  // =====================
  const creditType = await prisma.transactionType.create({
    data: {
      code: 'CREDIT',
      label: 'Crédit',
    },
  })

  const debitType = await prisma.transactionType.create({
    data: {
      code: 'DEBIT',
      label: 'Débit',
    },
  })

  // =====================
  // TRANSACTION NATURES
  // =====================
  const cashNature = await prisma.transactionNature.create({
    data: {
      code: 'CASH',
      label: 'Espèce',
    },
  })

  // =====================
  // TRANSACTIONS
  // =====================
  await prisma.transaction.create({
    data: {
      transactionTypeId: creditType.id,
      transactionNatureId: cashNature.id,
      userId: admin.id,
      amount: 150000,
      reference: 'TXN-001',
      description: 'Paiement initial',
      transactionDate: new Date(),
    },
  })

  // =====================
  // INVOICE STATUS
  // =====================
  const invoicePending = await prisma.invoiceStatus.create({
    data: {
      code: 'PENDING',
      label: 'En attente',
    },
  })

  // =====================
  // PAYMENT METHOD
  // =====================
  const mobileMoney = await prisma.paymentMethod.create({
    data: {
      code: 'MOBILE_MONEY',
      label: 'Mobile Money',
    },
  })

  // =====================
  // INVOICE
  // =====================
  const invoice = await prisma.invoice.create({
    data: {
      invoiceNumber: 'INV-0001',
      invoiceDate: new Date(),
      customerId: customer.id,
      statusId: invoicePending.id,
      paymentMethodId: mobileMoney.id,
      createdById: admin.id,
      receverName: 'Rakoto Jean',
      receverContact: '+261340000000',
      discountAmount: 0,
      extraFee: 5000,
    },
  })

  // =====================
  // INVOICE ITEM
  // =====================
  await prisma.invoiceItem.create({
    data: {
      invoiceId: invoice.id,
      parcelId: parcel.id,
      shippingTypeId: air.id,
      trackingNumber: parcel.trackingNumber,
      price: 25000,
      weightKg: 12.5,
      billableWeightKg: 13,
      packageType: 'BOX',
    },
  })

  // =====================
  // PRICE
  // =====================
  await prisma.price.create({
    data: {
      label: 'Tarif Air Standard',
      shippingTypeId: air.id,
      amount: 20000,
    },
  })

  await prisma.price.create({
    data: {
      label: 'Tarif Maritime Standard',
      shippingTypeId: sea.id,
      amount: 10000,
    },
  })

  // =====================
  // AUDIT LOG
  // =====================
  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      entityType: 'USER',
      entityId: String(admin.id),
      action: 'CREATE',
      description: 'Création admin système',
      ipAddress: '127.0.0.1',
      metadata: {
        source: 'seed',
      },
    },
  })

  console.log('✅ Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })