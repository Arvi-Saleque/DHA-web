import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const coreValue = await prisma.coreValue.create({
      data: {
        title: data.title,
        description: data.description,
        iconType: data.iconType,
        displayOrder: data.displayOrder,
        isActive: data.isActive ?? true,
      }
    });

    revalidatePath('/aboutus/about');
    return NextResponse.json(coreValue);
  } catch (error) {
    console.error('Error creating core value:', error);
    return NextResponse.json(
      { error: 'Failed to create core value' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();

    const coreValue = await prisma.coreValue.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        iconType: data.iconType,
        displayOrder: data.displayOrder,
        isActive: data.isActive,
      }
    });

    revalidatePath('/aboutus/about');
    return NextResponse.json(coreValue);
  } catch (error) {
    console.error('Error updating core value:', error);
    return NextResponse.json(
      { error: 'Failed to update core value' },
      { status: 500 }
    );
  }
}