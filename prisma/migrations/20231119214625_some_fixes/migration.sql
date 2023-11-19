/*
  Warnings:

  - You are about to drop the column `userEmail` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `Age` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `Email` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `Number` table. All the data in the column will be lost.
  - You are about to drop the `ServerAddress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServerAge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServerEmail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ServerNumber` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Age` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Email` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Number` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_userEmail_fkey";

-- DropForeignKey
ALTER TABLE "Age" DROP CONSTRAINT "Age_userEmail_fkey";

-- DropForeignKey
ALTER TABLE "Email" DROP CONSTRAINT "Email_userEmail_fkey";

-- DropForeignKey
ALTER TABLE "Number" DROP CONSTRAINT "Number_userEmail_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "ServerAddress" DROP CONSTRAINT "ServerAddress_serverId_fkey";

-- DropForeignKey
ALTER TABLE "ServerAge" DROP CONSTRAINT "ServerAge_serverId_fkey";

-- DropForeignKey
ALTER TABLE "ServerEmail" DROP CONSTRAINT "ServerEmail_serverId_fkey";

-- DropForeignKey
ALTER TABLE "ServerNumber" DROP CONSTRAINT "ServerNumber_serverId_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "userEmail",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Age" DROP COLUMN "userEmail",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Email" DROP COLUMN "userEmail",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Number" DROP COLUMN "userEmail",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "userId" SET NOT NULL;

-- DropTable
DROP TABLE "ServerAddress";

-- DropTable
DROP TABLE "ServerAge";

-- DropTable
DROP TABLE "ServerEmail";

-- DropTable
DROP TABLE "ServerNumber";

-- CreateTable
CREATE TABLE "ServerData" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,

    CONSTRAINT "ServerData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ServerData_serverId_idx" ON "ServerData"("serverId");

-- AddForeignKey
ALTER TABLE "ServerData" ADD CONSTRAINT "ServerData_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Number" ADD CONSTRAINT "Number_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Age" ADD CONSTRAINT "Age_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
