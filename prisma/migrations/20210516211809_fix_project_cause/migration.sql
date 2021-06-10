/*
  Warnings:

  - You are about to drop the column `projectId` on the `Cause` table. All the data in the column will be lost.
  - Added the required column `causeId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cause" DROP CONSTRAINT "Cause_projectId_fkey";

-- AlterTable
ALTER TABLE "Cause" DROP COLUMN "projectId";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "causeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD FOREIGN KEY ("causeId") REFERENCES "Cause"("id") ON DELETE CASCADE ON UPDATE CASCADE;
