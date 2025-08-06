/*
  Warnings:

  - The values [PAUSED] on the enum `InvoiceStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."InvoiceStatus_new" AS ENUM ('DENIED', 'PENDING', 'PAID', 'CANCELLED', 'REPORTED');
ALTER TABLE "public"."Invoices" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."Invoices" ALTER COLUMN "status" TYPE "public"."InvoiceStatus_new" USING ("status"::text::"public"."InvoiceStatus_new");
ALTER TYPE "public"."InvoiceStatus" RENAME TO "InvoiceStatus_old";
ALTER TYPE "public"."InvoiceStatus_new" RENAME TO "InvoiceStatus";
DROP TYPE "public"."InvoiceStatus_old";
ALTER TABLE "public"."Invoices" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;
