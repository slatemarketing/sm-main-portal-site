-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('DENIED', 'PENDING', 'PAID', 'CANCELLED', 'REPORTED');

-- CreateTable
CREATE TABLE "Invoices" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "invoiceNumber" INTEGER NOT NULL,
    "InvoiceId" TEXT NOT NULL,
    "company" TEXT,
    "amount" INTEGER,
    "date" TIMESTAMP(3),
    "email" TEXT,
    "status" "InvoiceStatus" NOT NULL DEFAULT 'PENDING',
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invoices_userId_key" ON "Invoices"("userId");

-- AddForeignKey
ALTER TABLE "Invoices" ADD CONSTRAINT "Invoices_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
