import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const [aboutUsPage, aboutSection, statistics, coreValues, leadership] = await Promise.all([
      prisma.aboutUsPage.findUnique({ where: { id: 1 } }),
      prisma.aboutSection.findUnique({ where: { id: 1 } }),
      prisma.aboutStatistic.findMany({ 
        orderBy: { displayOrder: 'asc' } 
      }),
      prisma.coreValue.findMany({ 
        orderBy: { displayOrder: 'asc' } 
      }),
      prisma.leadershipMember.findMany({ 
        orderBy: { displayOrder: 'asc' } 
      })
    ]);

    return NextResponse.json({
      aboutUsPage,
      aboutSection,
      statistics,
      coreValues,
      leadership
    });
  } catch (error) {
    console.error('Error fetching About Us data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch About Us data' },
      { status: 500 }
    );
  }
}