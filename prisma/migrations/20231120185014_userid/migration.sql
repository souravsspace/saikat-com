/*
  Warnings:

  - The primary key for the `Data` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Data" DROP CONSTRAINT "Data_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Data_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Data_id_seq";
