/*
  Warnings:

  - You are about to drop the column `county` on the `Data` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Data" DROP COLUMN "county",
ADD COLUMN     "country" VARCHAR(70);
