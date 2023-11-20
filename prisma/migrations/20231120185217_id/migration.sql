/*
  Warnings:

  - The primary key for the `Data` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Data` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Data" DROP CONSTRAINT "Data_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
ADD CONSTRAINT "Data_pkey" PRIMARY KEY ("id");
