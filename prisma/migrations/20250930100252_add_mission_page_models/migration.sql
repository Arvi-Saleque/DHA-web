-- AlterTable
ALTER TABLE "public"."AboutSection_about" ALTER COLUMN "id" SET DEFAULT 1;

-- CreateTable
CREATE TABLE "public"."MissionSection" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "heroTitle" TEXT NOT NULL,
    "heroSubtitle" TEXT NOT NULL,
    "heroDescription" TEXT NOT NULL,
    "missionTitle" TEXT NOT NULL DEFAULT 'Our Mission',
    "missionDescription" TEXT NOT NULL,
    "missionPoints" JSONB NOT NULL,
    "visionTitle" TEXT NOT NULL DEFAULT 'Our Vision',
    "visionDescription" TEXT NOT NULL,
    "visionPoints" JSONB NOT NULL,
    "commitmentTitle" TEXT NOT NULL DEFAULT 'Our Commitment to Excellence',
    "commitmentDescription" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MissionSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CoreValue_mission" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "CoreValue_mission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Goal_mission" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "points" JSONB NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Goal_mission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Timeline_mission" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "icon" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Timeline_mission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Commitment_mission" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Commitment_mission_pkey" PRIMARY KEY ("id")
);
