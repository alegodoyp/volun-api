/*
  Warnings:

  - You are about to drop the column `photoId` on the `Project` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_photoId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "photoId";

-- CreateTable
CREATE TABLE "_PhotoToProject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PhotoToProject_AB_unique" ON "_PhotoToProject"("A", "B");

-- CreateIndex
CREATE INDEX "_PhotoToProject_B_index" ON "_PhotoToProject"("B");

-- AddForeignKey
ALTER TABLE "_PhotoToProject" ADD FOREIGN KEY ("A") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PhotoToProject" ADD FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
