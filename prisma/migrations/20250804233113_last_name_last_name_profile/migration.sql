/*
  Warnings:

  - You are about to drop the column `LastName` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "LastName",
ADD COLUMN     "lastName" TEXT;
