/*
  Warnings:

  - Added the required column `listId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "listId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_listId_fkey" FOREIGN KEY ("listId") REFERENCES "OrderList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
