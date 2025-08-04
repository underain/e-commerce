/*
  Warnings:

  - You are about to drop the column `memory_id` on the `product_variants` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "product_variants" DROP CONSTRAINT "product_variants_memory_id_fkey";

-- AlterTable
ALTER TABLE "product_variants" DROP COLUMN "memory_id",
ADD COLUMN     "memoryId" TEXT;

-- AddForeignKey
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_memoryId_fkey" FOREIGN KEY ("memoryId") REFERENCES "memory_options"("id") ON DELETE CASCADE ON UPDATE CASCADE;
