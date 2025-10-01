/*
  Warnings:

  - You are about to drop the column `achievements` on the `AboutSection` table. All the data in the column will be lost.
  - You are about to drop the column `coreValues` on the `AboutSection` table. All the data in the column will be lost.
  - You are about to drop the column `programs` on the `AboutSection` table. All the data in the column will be lost.
  - You are about to drop the column `subtitle` on the `AboutSection` table. All the data in the column will be lost.
  - You are about to drop the column `teamMembers` on the `AboutSection` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `AboutSection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."AboutSection" DROP COLUMN "achievements",
DROP COLUMN "coreValues",
DROP COLUMN "programs",
DROP COLUMN "subtitle",
DROP COLUMN "teamMembers",
DROP COLUMN "title";

-- CreateTable
CREATE TABLE "public"."AboutSection_about" (
    "id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "mission" TEXT NOT NULL,
    "vision" TEXT NOT NULL,
    "yearEstablished" TEXT NOT NULL,
    "totalStudents" TEXT NOT NULL,
    "graduatedStudents" TEXT NOT NULL,
    "qualifiedTeachers" TEXT NOT NULL,

    CONSTRAINT "AboutSection_about_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Program_about" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Program_about_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CoreValue_about" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "CoreValue_about_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Leader_about" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "credential" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Leader_about_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Achievement_about" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Achievement_about_pkey" PRIMARY KEY ("id")
);
