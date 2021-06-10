/*
  Warnings:

  - You are about to drop the column `localityId` on the `Project` table. All the data in the column will be lost.
  - Added the required column `locality` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_localityId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "localityId",
ADD COLUMN     "locality" TEXT NOT NULL;
