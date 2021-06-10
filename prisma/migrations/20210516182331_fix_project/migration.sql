/*
  Warnings:

  - You are about to drop the column `name` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Project` table. All the data in the column will be lost.
  - Added the required column `title` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `about` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `frequency` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `online` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "name",
DROP COLUMN "startDate",
DROP COLUMN "endDate",
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "about" TEXT NOT NULL,
ADD COLUMN     "created" TIMESTAMP(3),
ADD COLUMN     "frequency" TEXT NOT NULL,
ADD COLUMN     "online" BOOLEAN NOT NULL;
