-- AlterTable
ALTER TABLE "public"."AboutSection" ADD COLUMN     "achievements" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "historyTimeline" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "teamMembers" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "testimonials" JSONB NOT NULL DEFAULT '[]';
