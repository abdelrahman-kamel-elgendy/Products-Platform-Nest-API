/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Products` table. All the data in the column will be lost.
  - Added the required column `categoryName` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_categoryId_fkey";

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "categoryId",
ADD COLUMN     "categoryName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
