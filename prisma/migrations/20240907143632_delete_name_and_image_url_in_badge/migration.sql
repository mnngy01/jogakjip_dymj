/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Badge` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Badge` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Badge" DROP COLUMN "imageUrl",
DROP COLUMN "name";
