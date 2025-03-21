-- CreateTable
CREATE TABLE "user"."geolocations" (
    "id" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "city" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "userId" TEXT,

    CONSTRAINT "geolocations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "geolocations_userId_key" ON "user"."geolocations"("userId");

-- AddForeignKey
ALTER TABLE "user"."geolocations" ADD CONSTRAINT "geolocations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
