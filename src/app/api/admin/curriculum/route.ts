import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Fetch all curriculum classes with their items
export async function GET() {
  try {
    const classes = await prisma.curriculumClass.findMany({
      where: { isActive: true },
      include: {
        curriculumItems: {
          where: { isActive: true },
          orderBy: { displayOrder: 'asc' }
        }
      },
      orderBy: { displayOrder: 'asc' }
    });

    return NextResponse.json({ success: true, data: classes });
  } catch (error) {
    console.error('Error fetching curriculum:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch curriculum' },
      { status: 500 }
    );
  }
}

// POST - Create a new curriculum class
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, displayOrder } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Class name is required' },
        { status: 400 }
      );
    }

    const newClass = await prisma.curriculumClass.create({
      data: {
        name,
        description,
        displayOrder: displayOrder || 0
      }
    });

    return NextResponse.json({ success: true, data: newClass });
  } catch (error) {
    console.error('Error creating curriculum class:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create curriculum class' },
      { status: 500 }
    );
  }
}

// PUT - Update a curriculum class
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, description, displayOrder, isActive } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Class ID is required' },
        { status: 400 }
      );
    }

    const updatedClass = await prisma.curriculumClass.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(displayOrder !== undefined && { displayOrder }),
        ...(isActive !== undefined && { isActive })
      }
    });

    return NextResponse.json({ success: true, data: updatedClass });
  } catch (error) {
    console.error('Error updating curriculum class:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update curriculum class' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a curriculum class
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Class ID is required' },
        { status: 400 }
      );
    }

    await prisma.curriculumClass.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ success: true, message: 'Class deleted successfully' });
  } catch (error) {
    console.error('Error deleting curriculum class:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete curriculum class' },
      { status: 500 }
    );
  }
}