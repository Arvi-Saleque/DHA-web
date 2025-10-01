import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const { advisoryCommittee } = await request.json();

    if (advisoryCommittee) {
      await prisma.advisoryCommittee.upsert({
        where: { id: 1 },
        update: {
          heroTitle: advisoryCommittee.heroTitle,
          heroSubtitle: advisoryCommittee.heroSubtitle,
          introTitle: advisoryCommittee.introTitle,
          introContent: advisoryCommittee.introContent,
          rolesTitle: advisoryCommittee.rolesTitle,
          rolesContent: advisoryCommittee.rolesContent,
          ctaTitle: advisoryCommittee.ctaTitle,
          ctaSubtitle: advisoryCommittee.ctaSubtitle,
          ctaButtonText: advisoryCommittee.ctaButtonText,
          ctaButtonLink: advisoryCommittee.ctaButtonLink,
        },
        create: {
          id: 1,
          heroTitle: advisoryCommittee.heroTitle || 'Advisory Committee',
          heroSubtitle: advisoryCommittee.heroSubtitle || 'Distinguished leaders and experts guiding our institution...',
          introTitle: advisoryCommittee.introTitle || 'Our Advisory Board',
          introContent: advisoryCommittee.introContent || 'Our Advisory Committee comprises distinguished professionals...',
          rolesTitle: advisoryCommittee.rolesTitle || 'Committee Roles & Responsibilities',
          rolesContent: advisoryCommittee.rolesContent || 'The Advisory Committee plays a crucial role...',
          ctaTitle: advisoryCommittee.ctaTitle || 'Join Our Advisory Network',
          ctaSubtitle: advisoryCommittee.ctaSubtitle || 'We welcome qualified professionals...',
          ctaButtonText: advisoryCommittee.ctaButtonText || 'Get Involved',
          ctaButtonLink: advisoryCommittee.ctaButtonLink || '/contact',
        }
      });
    }

    // Revalidate the Advisory Committee page to show changes immediately
    revalidatePath('/aboutus/committee');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving Advisory Committee page content:', error);
    return NextResponse.json(
      { error: 'Failed to save Advisory Committee page content' },
      { status: 500 }
    );
  }
}