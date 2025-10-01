import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const missionVision = await prisma.missionVision.findUnique({ 
      where: { id: 1 } 
    });

    return NextResponse.json({
      missionVision
    });
  } catch (error) {
    console.error('Error fetching Mission & Vision data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Mission & Vision data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { missionVision } = await request.json();

    if (missionVision) {
      await prisma.missionVision.upsert({
        where: { id: 1 },
        update: {
          heroTitle: missionVision.heroTitle,
          heroSubtitle: missionVision.heroSubtitle,
          missionTitle: missionVision.missionTitle,
          missionContent: missionVision.missionContent,
          missionImage: missionVision.missionImage || null,
          visionTitle: missionVision.visionTitle,
          visionContent: missionVision.visionContent,
          visionImage: missionVision.visionImage || null,
          goalTitle: missionVision.goalTitle,
          goalContent: missionVision.goalContent,
          goalImage: missionVision.goalImage || null,
          ctaTitle: missionVision.ctaTitle,
          ctaSubtitle: missionVision.ctaSubtitle,
          ctaButtonText: missionVision.ctaButtonText,
          ctaButtonLink: missionVision.ctaButtonLink,
        },
        create: {
          id: 1,
          heroTitle: missionVision.heroTitle || 'Our Mission & Vision',
          heroSubtitle: missionVision.heroSubtitle || 'Guiding principles that shape our educational journey...',
          missionTitle: missionVision.missionTitle || 'Our Mission',
          missionContent: missionVision.missionContent || 'To provide exceptional Islamic education...',
          missionImage: missionVision.missionImage || null,
          visionTitle: missionVision.visionTitle || 'Our Vision',
          visionContent: missionVision.visionContent || 'To be a leading institution in Islamic education...',
          visionImage: missionVision.visionImage || null,
          goalTitle: missionVision.goalTitle || 'Our Goals',
          goalContent: missionVision.goalContent || 'We strive to create an environment where students excel academically...',
          goalImage: missionVision.goalImage || null,
          ctaTitle: missionVision.ctaTitle || 'Join Our Mission',
          ctaSubtitle: missionVision.ctaSubtitle || 'Be part of our journey to transform lives...',
          ctaButtonText: missionVision.ctaButtonText || 'Get Involved',
          ctaButtonLink: missionVision.ctaButtonLink || '/contact',
        }
      });
    }

    // Revalidate the Mission & Vision page to show changes immediately
    revalidatePath('/aboutus/mission');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving Mission & Vision data:', error);
    return NextResponse.json(
      { error: 'Failed to save Mission & Vision data' },
      { status: 500 }
    );
  }
}