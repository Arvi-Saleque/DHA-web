import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const { aboutUsPage, aboutSection } = await request.json();

    // Update AboutUsPage
    if (aboutUsPage) {
      await prisma.aboutUsPage.upsert({
        where: { id: 1 },
        update: {
          heroTitle: aboutUsPage.heroTitle,
          heroSubtitle: aboutUsPage.heroSubtitle,
          historyTitle: aboutUsPage.historyTitle,
          historyContent1: aboutUsPage.historyContent1,
          historyContent2: aboutUsPage.historyContent2,
          ctaTitle: aboutUsPage.ctaTitle,
          ctaSubtitle: aboutUsPage.ctaSubtitle,
          ctaButton1Text: aboutUsPage.ctaButton1Text,
          ctaButton1Link: aboutUsPage.ctaButton1Link,
          ctaButton2Text: aboutUsPage.ctaButton2Text,
          ctaButton2Link: aboutUsPage.ctaButton2Link,
        },
        create: {
          id: 1,
          heroTitle: aboutUsPage.heroTitle || 'About Our Madrasa',
          heroSubtitle: aboutUsPage.heroSubtitle || 'Dedicated to providing exceptional Islamic education...',
          historyTitle: aboutUsPage.historyTitle || 'Our History',
          historyContent1: aboutUsPage.historyContent1 || 'Established in 2010...',
          historyContent2: aboutUsPage.historyContent2 || 'From humble beginnings...',
          ctaTitle: aboutUsPage.ctaTitle || 'Join Our Community',
          ctaSubtitle: aboutUsPage.ctaSubtitle || 'Become part of our educational family...',
          ctaButton1Text: aboutUsPage.ctaButton1Text || 'Apply for Admission',
          ctaButton1Link: aboutUsPage.ctaButton1Link || '/admissions/apply',
          ctaButton2Text: aboutUsPage.ctaButton2Text || 'Contact Us',
          ctaButton2Link: aboutUsPage.ctaButton2Link || '/contact',
        }
      });
    }

    // Update AboutSection
    if (aboutSection) {
      await prisma.aboutSection.upsert({
        where: { id: 1 },
        update: {
          mission: aboutSection.mission,
          vision: aboutSection.vision,
          description: aboutSection.description,
          yearEstablished: aboutSection.yearEstablished,
          totalStudents: aboutSection.totalStudents,
          graduatedStudents: aboutSection.graduatedStudents,
          qualifiedTeachers: aboutSection.qualifiedTeachers,
        },
        create: {
          id: 1,
          mission: aboutSection.mission || 'Our mission is to provide exceptional Islamic education...',
          vision: aboutSection.vision || 'To be a leading institution in Islamic education...',
          description: aboutSection.description || 'Established with a vision to blend traditional Islamic teachings...',
          yearEstablished: aboutSection.yearEstablished || '2010',
          totalStudents: aboutSection.totalStudents || '500+',
          graduatedStudents: aboutSection.graduatedStudents || '1200+',
          qualifiedTeachers: aboutSection.qualifiedTeachers || '25',
        }
      });
    }

    // Revalidate the About Us page to show changes immediately
    revalidatePath('/aboutus/about');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving page content:', error);
    return NextResponse.json(
      { error: 'Failed to save page content' },
      { status: 500 }
    );
  }
}