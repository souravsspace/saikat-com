-- CreateTable
CREATE TABLE "Server" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Server_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServerEmail" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "serverId" TEXT,

    CONSTRAINT "ServerEmail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServerNumber" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "serverId" TEXT,

    CONSTRAINT "ServerNumber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServerAddress" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "serverId" TEXT,

    CONSTRAINT "ServerAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServerAge" (
    "id" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "serverId" TEXT,

    CONSTRAINT "ServerAge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Email" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userEmail" TEXT,

    CONSTRAINT "Email_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Number" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "userEmail" TEXT,

    CONSTRAINT "Number_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "userEmail" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Age" (
    "id" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "userEmail" TEXT,

    CONSTRAINT "Age_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ServerEmail" ADD CONSTRAINT "ServerEmail_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServerNumber" ADD CONSTRAINT "ServerNumber_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServerAddress" ADD CONSTRAINT "ServerAddress_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServerAge" ADD CONSTRAINT "ServerAge_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Number" ADD CONSTRAINT "Number_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Age" ADD CONSTRAINT "Age_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;
