-- CreateEnum
CREATE TYPE "public"."CompanyStatus" AS ENUM ('PENDING', 'ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "public"."company" ADD COLUMN     "status" "public"."CompanyStatus" NOT NULL DEFAULT 'PENDING';
