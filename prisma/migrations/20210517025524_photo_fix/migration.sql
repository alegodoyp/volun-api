-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_projectId_fkey";

-- CreateTable
CREATE TABLE "_OrganizationToPhoto" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PhotoToProject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrganizationToPhoto_AB_unique" ON "_OrganizationToPhoto"("A", "B");

-- CreateIndex
CREATE INDEX "_OrganizationToPhoto_B_index" ON "_OrganizationToPhoto"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PhotoToProject_AB_unique" ON "_PhotoToProject"("A", "B");

-- CreateIndex
CREATE INDEX "_PhotoToProject_B_index" ON "_PhotoToProject"("B");

-- AddForeignKey
ALTER TABLE "_OrganizationToPhoto" ADD FOREIGN KEY ("A") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrganizationToPhoto" ADD FOREIGN KEY ("B") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PhotoToProject" ADD FOREIGN KEY ("A") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PhotoToProject" ADD FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
