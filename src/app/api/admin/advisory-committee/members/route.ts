import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const memberData = await request.json();

    const member = await prisma.committeeMember.create({
      data: {
        name: memberData.name,
        position: memberData.position,
        expertise: memberData.expertise,
        bio: memberData.bio,
        imageUrl: memberData.imageUrl || null,
        email: memberData.email || null,
        phone: memberData.phone || null,
        linkedinUrl: memberData.linkedinUrl || null,
        displayOrder: memberData.displayOrder || 0,
        isActive: memberData.isActive ?? true,
      }
    });

    // Revalidate the Advisory Committee page
    revalidatePath('/aboutus/committee');

    return NextResponse.json({ success: true, member });
  } catch (error) {
    console.error('Error creating committee member:', error);
    return NextResponse.json(
      { error: 'Failed to create committee member' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const memberData = await request.json();
    const { id, ...updateData } = memberData;

    const member = await prisma.committeeMember.update({
      where: { id: parseInt(id) },
      data: {
        name: updateData.name,
        position: updateData.position,
        expertise: updateData.expertise,
        bio: updateData.bio,
        imageUrl: updateData.imageUrl || null,
        email: updateData.email || null,
        phone: updateData.phone || null,
        linkedinUrl: updateData.linkedinUrl || null,
        displayOrder: updateData.displayOrder || 0,
        isActive: updateData.isActive ?? true,
      }
    });

    // Revalidate the Advisory Committee page
    revalidatePath('/aboutus/committee');

    return NextResponse.json({ success: true, member });
  } catch (error) {
    console.error('Error updating committee member:', error);
    return NextResponse.json(
      { error: 'Failed to update committee member' },
      { status: 500 }
    );
  }
}