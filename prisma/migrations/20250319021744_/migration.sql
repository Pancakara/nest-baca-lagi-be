-- CreateEnum
CREATE TYPE "post"."PurchaseStatus" AS ENUM ('AVAILABLE', 'SOLD');

-- AlterTable
ALTER TABLE "post"."posts" ADD COLUMN     "status" "post"."PurchaseStatus" NOT NULL DEFAULT 'AVAILABLE';
