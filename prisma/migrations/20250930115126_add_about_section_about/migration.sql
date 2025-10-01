/*
  Warnings:

  - You are about to drop the `MissionPage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."MissionPage";

-- CreateTable
CREATE TABLE "public"."AboutSection_about" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "title" TEXT NOT NULL DEFAULT 'About Us',
    "subtitle" TEXT NOT NULL DEFAULT 'Learn more about our institution',
    "description" TEXT NOT NULL DEFAULT '',
    "mission" TEXT NOT NULL DEFAULT '',
    "vision" TEXT NOT NULL DEFAULT '',
    "yearEstablished" TEXT NOT NULL DEFAULT '2010',
    "totalStudents" TEXT NOT NULL DEFAULT '500+',
    "graduatedStudents" TEXT NOT NULL DEFAULT '1200+',
    "qualifiedTeachers" TEXT NOT NULL DEFAULT '25',
    "history" TEXT NOT NULL DEFAULT '',
    "values" TEXT NOT NULL DEFAULT '',
    "achievements" TEXT NOT NULL DEFAULT '',
    "address" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "facebook" TEXT NOT NULL DEFAULT '',
    "instagram" TEXT NOT NULL DEFAULT '',
    "twitter" TEXT NOT NULL DEFAULT '',
    "youtube" TEXT NOT NULL DEFAULT '',
    "heroImage" TEXT NOT NULL DEFAULT '',
    "galleryImages" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutSection_about_pkey" PRIMARY KEY ("id")
);
