/*
  Warnings:

  - You are about to drop the column `company` on the `Invoices` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "public"."UserRole" ADD VALUE 'USER';

-- AlterTable
ALTER TABLE "public"."Invoices" DROP COLUMN "company",
ADD COLUMN     "companyId" TEXT;

-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "companyId" TEXT,
ALTER COLUMN "role" SET DEFAULT 'USER';

-- CreateTable
CREATE TABLE "public"."company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "website" TEXT,
    "billingAddress" TEXT,
    "billingCity" TEXT,
    "billingState" TEXT,
    "billingZip" TEXT,
    "billingCountry" TEXT DEFAULT 'USA',
    "industry" TEXT,
    "description" TEXT,
    "taxId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."user" ADD CONSTRAINT "user_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Invoices" ADD CONSTRAINT "Invoices_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
