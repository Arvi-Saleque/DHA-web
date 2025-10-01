import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const statistic = await prisma.aboutStatistic.create({
      data: {
        title: data.title,
        value: data.value,
        iconType: data.iconType,
        color: data.color,
        displayOrder: data.displayOrder,
        isActive: data.isActive ?? true,
      }
    });

    revalidatePath('/aboutus/about');
    return NextResponse.json(statistic);
  } catch (error) {
    console.error('Error creating statistic:', error);
    return NextResponse.json(
      { error: 'Failed to create statistic' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();

    const statistic = await prisma.aboutStatistic.update({
      where: { id: data.id },
      data: {
        title: data.title,
        value: data.value,
        iconType: data.iconType,
        color: data.color,
        displayOrder: data.displayOrder,
        isActive: data.isActive,
      }
    });

    revalidatePath('/aboutus/about');
    return NextResponse.json(statistic);
  } catch (error) {
    console.error('Error updating statistic:', error);
    return NextResponse.json(
      { error: 'Failed to update statistic' },
      { status: 500 }
    );
  }
}