/*
  Warnings:

  - You are about to drop the column `Phone` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "Phone",
ADD COLUMN     "phone" TEXT;
