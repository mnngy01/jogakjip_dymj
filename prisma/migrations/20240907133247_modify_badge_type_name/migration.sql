/*
  Warnings:

  - The values [WEEK_JOGAK,TWENTY_MEMORIES,GROUP_ONE_ANNYVERSARY,GROUP_LIKE_TEN_THOUSANDS,MEMORY_LIKE_TEN_THOUSANDS] on the enum `BadgeType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BadgeType_new" AS ENUM ('badge1', 'badge2', 'badge3', 'badge4', 'badge5');
ALTER TABLE "Badge" ALTER COLUMN "type" TYPE "BadgeType_new" USING ("type"::text::"BadgeType_new");
ALTER TYPE "BadgeType" RENAME TO "BadgeType_old";
ALTER TYPE "BadgeType_new" RENAME TO "BadgeType";
DROP TYPE "BadgeType_old";
COMMIT;
