/*
  Warnings:

  - Added the required column `granted` to the `Wish` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Wish" ADD COLUMN     "granted" BOOLEAN NOT NULL;
