/*
  Warnings:

  - Made the column `created` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "created" SET NOT NULL,
ALTER COLUMN "created" DROP DEFAULT,
ALTER COLUMN "created" SET DATA TYPE TEXT;
