import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const leadershipMember = await prisma.leadershipMember.create({
      data: {
        name: data.name,
        position: data.position,
        description: data.description,
        imageUrl: data.imageUrl || null,
        email: data.email || null,
        phone: data.phone || null,
        displayOrder: data.displayOrder,
        isActive: data.isActive ?? true,
      }
    });

    revalidatePath('/aboutus/about');
    return NextResponse.json(leadershipMember);
  } catch (error) {
    console.error('Error creating leadership member:', error);
    return NextResponse.json(
      { error: 'Failed to create leadership member' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();

    const leadershipMember = await prisma.leadershipMember.update({
      where: { id: data.id },
      data: {
        name: data.name,
        position: data.position,
        description: data.description,
        imageUrl: data.imageUrl || null,
        email: data.email || null,
        phone: data.phone || null,
        displayOrder: data.displayOrder,
        isActive: data.isActive,
      }
    });

    revalidatePath('/aboutus/about');
    return NextResponse.json(leadershipMember);
  } catch (error) {
    console.error('Error updating leadership member:', error);
    return NextResponse.json(
      { error: 'Failed to update leadership member' },
      { status: 500 }
    );
  }
}