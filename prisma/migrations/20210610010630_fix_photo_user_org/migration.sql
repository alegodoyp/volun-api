/*
  Warnings:

  - You are about to drop the column `photoId` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the column `photoId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_photoId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_photoId_fkey";

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "photoId",
ADD COLUMN     "photo" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "photoId",
ADD COLUMN     "photo" TEXT;
