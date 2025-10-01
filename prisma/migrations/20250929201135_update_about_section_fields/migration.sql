/*
  Warnings:

  - You are about to drop the column `historyTimeline` on the `AboutSection` table. All the data in the column will be lost.
  - You are about to drop the column `testimonials` on the `AboutSection` table. All the data in the column will be lost.
  - Made the column `achievements` on table `AboutSection` required. This step will fail if there are existing NULL values in that column.
  - Made the column `teamMembers` on table `AboutSection` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."AboutSection" DROP COLUMN "historyTimeline",
DROP COLUMN "testimonials",
ADD COLUMN     "coreValues" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "programs" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "subtitle" TEXT NOT NULL DEFAULT 'Nurturing Hearts, Enlightening Minds, Building Character',
ADD COLUMN     "title" TEXT NOT NULL DEFAULT 'About Our Madrasa',
ALTER COLUMN "achievements" SET NOT NULL,
ALTER COLUMN "achievements" SET DEFAULT '[]',
ALTER COLUMN "teamMembers" SET NOT NULL,
ALTER COLUMN "teamMembers" SET DEFAULT '[]';
