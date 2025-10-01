import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const chairmanMessage = await prisma.chairmanMessage.findUnique({ 
      where: { id: 1 } 
    });

    return NextResponse.json({
      chairmanMessage
    });
  } catch (error) {
    console.error('Error fetching Chairman Message data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Chairman Message data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { chairmanMessage } = await request.json();

    if (chairmanMessage) {
      await prisma.chairmanMessage.upsert({
        where: { id: 1 },
        update: {
          heroTitle: chairmanMessage.heroTitle,
          heroSubtitle: chairmanMessage.heroSubtitle,
          chairmanName: chairmanMessage.chairmanName,
          chairmanTitle: chairmanMessage.chairmanTitle,
          chairmanImage: chairmanMessage.chairmanImage,
          messageTitle: chairmanMessage.messageTitle,
          messageContent: chairmanMessage.messageContent,
          visionTitle: chairmanMessage.visionTitle,
          visionContent: chairmanMessage.visionContent,
          achievementsTitle: chairmanMessage.achievementsTitle,
          achievementsContent: chairmanMessage.achievementsContent,
          closingMessage: chairmanMessage.closingMessage,
          signature: chairmanMessage.signature,
        },
        create: {
          id: 1,
          heroTitle: chairmanMessage.heroTitle || "Chairman's Message",
          heroSubtitle: chairmanMessage.heroSubtitle || "A message from our esteemed Chairman about our vision, mission, and commitment to excellence in Islamic education.",
          chairmanName: chairmanMessage.chairmanName || "Dr. Muhammad Al-Rashid",
          chairmanTitle: chairmanMessage.chairmanTitle || "Chairman of the Board",
          chairmanImage: chairmanMessage.chairmanImage || "/images/chairman-placeholder.jpg",
          messageTitle: chairmanMessage.messageTitle || "Welcome to Our Institution",
          messageContent: chairmanMessage.messageContent || "Assalamu Alaikum wa Rahmatullahi wa Barakatuh...",
          visionTitle: chairmanMessage.visionTitle || "Our Vision for the Future",
          visionContent: chairmanMessage.visionContent || "We envision a future where our graduates become beacons of knowledge...",
          achievementsTitle: chairmanMessage.achievementsTitle || "Our Achievements and Milestones",
          achievementsContent: chairmanMessage.achievementsContent || "Over the years, we have achieved remarkable milestones...",
          closingMessage: chairmanMessage.closingMessage || "I invite you to join us in this noble journey...",
          signature: chairmanMessage.signature || "Dr. Muhammad Al-Rashid"
        }
      });
    }

    // Revalidate the Chairman Message page to show changes immediately
    revalidatePath('/aboutus/chairman');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving Chairman Message data:', error);
    return NextResponse.json(
      { error: 'Failed to save Chairman Message data' },
      { status: 500 }
    );
  }
}