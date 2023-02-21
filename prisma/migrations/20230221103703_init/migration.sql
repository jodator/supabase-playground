-- CreateTable
CREATE TABLE "OrderList" (
    "id" UUID NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "date" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID NOT NULL,

    CONSTRAINT "OrderList_pkey" PRIMARY KEY ("id")
);
