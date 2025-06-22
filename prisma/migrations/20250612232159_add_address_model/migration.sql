-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "street" VARCHAR(255),
    "city" VARCHAR(100),
    "province" VARCHAR(100),
    "country" VARCHAR(100) NOT NULL,
    "postalCode" VARCHAR(10) NOT NULL,
    "contactId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
