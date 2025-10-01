import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Fetch curriculum items for a specific class
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const classId = searchParams.get('classId');

    if (!classId) {
      return NextResponse.json(
        { success: false, error: 'Class ID is required' },
        { status: 400 }
      );
    }

    const items = await prisma.curriculumItem.findMany({
      where: { 
        classId: parseInt(classId),
        isActive: true 
      },
      include: {
        class: true
      },
      orderBy: { displayOrder: 'asc' }
    });

    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error('Error fetching curriculum items:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch curriculum items' },
      { status: 500 }
    );
  }
}

// POST - Create a new curriculum item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      classId, 
      title, 
      description, 
      pdfUrl, 
      imageUrl, 
      fileName, 
      fileSize, 
      uploadedBy, 
      displayOrder 
    } = body;

    if (!classId || !title) {
      return NextResponse.json(
        { success: false, error: 'Class ID and title are required' },
        { status: 400 }
      );
    }

    const newItem = await prisma.curriculumItem.create({
      data: {
        classId: parseInt(classId),
        title,
        description,
        pdfUrl,
        imageUrl,
        fileName,
        fileSize: fileSize ? parseInt(fileSize) : null,
        uploadedBy,
        displayOrder: displayOrder || 0
      },
      include: {
        class: true
      }
    });

    return NextResponse.json({ success: true, data: newItem });
  } catch (error) {
    console.error('Error creating curriculum item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create curriculum item' },
      { status: 500 }
    );
  }
}

// PUT - Update a curriculum item
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      id, 
      title, 
      description, 
      pdfUrl, 
      imageUrl, 
      fileName, 
      fileSize, 
      uploadedBy, 
      displayOrder, 
      isActive 
    } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Item ID is required' },
        { status: 400 }
      );
    }

    const updatedItem = await prisma.curriculumItem.update({
      where: { id: parseInt(id) },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(pdfUrl !== undefined && { pdfUrl }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(fileName !== undefined && { fileName }),
        ...(fileSize !== undefined && { fileSize: fileSize ? parseInt(fileSize) : null }),
        ...(uploadedBy !== undefined && { uploadedBy }),
        ...(displayOrder !== undefined && { displayOrder }),
        ...(isActive !== undefined && { isActive })
      },
      include: {
        class: true
      }
    });

    return NextResponse.json({ success: true, data: updatedItem });
  } catch (error) {
    console.error('Error updating curriculum item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update curriculum item' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a curriculum item
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Item ID is required' },
        { status: 400 }
      );
    }

    await prisma.curriculumItem.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ success: true, message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting curriculum item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete curriculum item' },
      { status: 500 }
    );
  }
}