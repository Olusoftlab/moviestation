/*
  Warnings:

  - Added the required column `rating` to the `WatchListItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WatchListItem" ADD COLUMN     "notes" TEXT,
ADD COLUMN     "rating" INTEGER NOT NULL;
