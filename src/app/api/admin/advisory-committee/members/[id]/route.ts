import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const memberData = await request.json();
    const id = parseInt(params.id);

    const member = await prisma.committeeMember.update({
      where: { id },
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
    console.error('Error updating committee member:', error);
    return NextResponse.json(
      { error: 'Failed to update committee member' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    await prisma.committeeMember.delete({
      where: { id }
    });

    // Revalidate the Advisory Committee page
    revalidatePath('/aboutus/committee');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting committee member:', error);
    return NextResponse.json(
      { error: 'Failed to delete committee member' },
      { status: 500 }
    );
  }
}