import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    await prisma.leadershipMember.delete({
      where: { id }
    });

    revalidatePath('/aboutus/about');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting leadership member:', error);
    return NextResponse.json(
      { error: 'Failed to delete leadership member' },
      { status: 500 }
    );
  }
}