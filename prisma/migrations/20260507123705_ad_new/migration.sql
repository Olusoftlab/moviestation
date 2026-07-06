/*
  Warnings:

  - Added the required column `releaseYear` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `runtime` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "genres" TEXT[],
ADD COLUMN     "releaseYear" INTEGER NOT NULL,
ADD COLUMN     "runtime" INTEGER NOT NULL;
