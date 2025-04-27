/*
  Warnings:

  - You are about to drop the column `categoryName` on the `Products` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_categoryName_fkey";

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "categoryName",
ADD COLUMN     "categoryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
