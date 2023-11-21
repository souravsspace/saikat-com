-- CreateTable
CREATE TABLE "Data" (
    "id" BIGSERIAL NOT NULL,
    "first_name" VARCHAR(100),
    "last_name" VARCHAR(100),
    "address" TEXT,
    "country" VARCHAR(70),
    "city" VARCHAR(70),
    "state" VARCHAR(70),
    "zip" INTEGER,
    "phone" INTEGER,
    "carrier" TEXT,
    "gender" VARCHAR(30),
    "ethnicity" TEXT,
    "ownrent" VARCHAR(30),
    "latitude" DECIMAL,
    "longitude" DECIMAL,
    "email" VARCHAR(100),
    "age" INTEGER,

    CONSTRAINT "Data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlackListData" (
    "id" TEXT NOT NULL,
    "first_name" VARCHAR(100),
    "last_name" VARCHAR(100),
    "email" VARCHAR(100),
    "address" TEXT,
    "country" VARCHAR(70),
    "age" INTEGER,
    "city" VARCHAR(70),
    "state" VARCHAR(70),
    "zip" INTEGER,
    "phone" INTEGER,
    "carrier" TEXT,
    "gender" VARCHAR(30),
    "ethnicity" TEXT,
    "ownrent" VARCHAR(30),
    "latitude" DECIMAL,
    "longitude" DECIMAL,
    "serverDataId" BIGINT NOT NULL,

    CONSTRAINT "BlackListData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseData" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "phone" INTEGER,
    "age" INTEGER,
    "address" TEXT,
    "gender" TEXT,
    "userId" TEXT,

    CONSTRAINT "PurchaseData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "emails" INTEGER NOT NULL,
    "isPaid" BOOLEAN NOT NULL,
    "address" BOOLEAN NOT NULL DEFAULT false,
    "age" BOOLEAN NOT NULL DEFAULT false,
    "phone" BOOLEAN NOT NULL DEFAULT false,
    "country" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "PurchaseData" ADD CONSTRAINT "PurchaseData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
