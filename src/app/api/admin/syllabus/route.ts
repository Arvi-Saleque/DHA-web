import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Fetch all syllabus classes with their items
export async function GET() {
  try {
    const classes = await prisma.syllabusClass.findMany({
      where: { isActive: true },
      include: {
        syllabusItems: {
          where: { isActive: true },
          orderBy: { displayOrder: 'asc' },
        },
      },
      orderBy: { displayOrder: 'asc' },
    });

    return NextResponse.json({ success: true, data: classes });
  } catch (error) {
    console.error('Error fetching syllabus:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch syllabus' },
      { status: 500 },
    );
  }
}

// POST - Create a new syllabus class
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, displayOrder } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Class name is required' },
        { status: 400 },
      );
    }

    const newClass = await prisma.syllabusClass.create({
      data: {
        name,
        description,
        displayOrder: displayOrder || 0,
      },
    });

    return NextResponse.json({ success: true, data: newClass });
  } catch (error) {
    console.error('Error creating syllabus class:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create syllabus class' },
      { status: 500 },
    );
  }
}

// PUT - Update a syllabus class
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, description, displayOrder, isActive } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Class ID is required' },
        { status: 400 },
      );
    }

    const updatedClass = await prisma.syllabusClass.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(displayOrder !== undefined && { displayOrder }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return NextResponse.json({ success: true, data: updatedClass });
  } catch (error) {
    console.error('Error updating syllabus class:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update syllabus class' },
      { status: 500 },
    );
  }
}

// DELETE - Delete a syllabus class
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Class ID is required' },
        { status: 400 },
      );
    }

    await prisma.syllabusClass.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ success: true, message: 'Class deleted successfully' });
  } catch (error) {
    console.error('Error deleting syllabus class:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete syllabus class' },
      { status: 500 },
    );
  }
}