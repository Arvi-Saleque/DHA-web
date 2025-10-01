import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const id = parseInt(context.params.id, 10);

    await prisma.coreValue.delete({
      where: { id },
    });

    revalidatePath('/aboutus/about');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting core value:', error);
    return NextResponse.json(
      { error: 'Failed to delete core value' },
      { status: 500 }
    );
  }
}
