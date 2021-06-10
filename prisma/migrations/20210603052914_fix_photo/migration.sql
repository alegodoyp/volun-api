/*
  Warnings:

  - You are about to drop the column `projectId` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the `_OrganizationToPhoto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PhotoToProject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_OrganizationToPhoto" DROP CONSTRAINT "_OrganizationToPhoto_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrganizationToPhoto" DROP CONSTRAINT "_OrganizationToPhoto_B_fkey";

-- DropForeignKey
ALTER TABLE "_PhotoToProject" DROP CONSTRAINT "_PhotoToProject_A_fkey";

-- DropForeignKey
ALTER TABLE "_PhotoToProject" DROP CONSTRAINT "_PhotoToProject_B_fkey";

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "photoId" INTEGER;

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "projectId",
DROP COLUMN "organizationId";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "photoId" INTEGER;

-- DropTable
DROP TABLE "_OrganizationToPhoto";

-- DropTable
DROP TABLE "_PhotoToProject";

-- AddForeignKey
ALTER TABLE "Organization" ADD FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
