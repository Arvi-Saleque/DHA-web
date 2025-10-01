-- AlterTable
ALTER TABLE "public"."AboutSection" ALTER COLUMN "achievements" DROP NOT NULL,
ALTER COLUMN "achievements" DROP DEFAULT,
ALTER COLUMN "historyTimeline" DROP NOT NULL,
ALTER COLUMN "historyTimeline" DROP DEFAULT,
ALTER COLUMN "teamMembers" DROP NOT NULL,
ALTER COLUMN "teamMembers" DROP DEFAULT,
ALTER COLUMN "testimonials" DROP NOT NULL,
ALTER COLUMN "testimonials" DROP DEFAULT;
