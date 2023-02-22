-- CreateTable
CREATE TABLE "OrderItem" (
    "id" UUID NOT NULL,
    "food" VARCHAR(200) NOT NULL,
    "drink" VARCHAR(200) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);
