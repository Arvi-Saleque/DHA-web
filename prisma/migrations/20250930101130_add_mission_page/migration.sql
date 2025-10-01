-- CreateTable
CREATE TABLE "public"."MissionPage" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "heroTitle" TEXT NOT NULL,
    "heroSubtitle" TEXT NOT NULL,
    "missionText" TEXT NOT NULL,
    "visionText" TEXT NOT NULL,
    "coreValues" JSONB NOT NULL,
    "timeline" JSONB NOT NULL,
    "shortTermGoals" JSONB NOT NULL,
    "longTermGoals" JSONB NOT NULL,
    "commitmentTitle" TEXT NOT NULL,
    "commitmentBody" TEXT NOT NULL,
    "commitmentPillars" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MissionPage_pkey" PRIMARY KEY ("id")
);
