/*
  Warnings:

  - The `tags` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "imageUrl" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL,
DROP COLUMN "tags",
ADD COLUMN     "tags" TEXT[],
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "password" SET DATA TYPE TEXT;
