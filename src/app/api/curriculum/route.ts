import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Public endpoint to fetch all curriculum classes with their items
export async function GET() {
  try {
    const classes = await prisma.curriculumClass.findMany({
      where: { isActive: true },
      include: {
        curriculumItems: {
          where: { isActive: true },
          orderBy: { displayOrder: 'asc' },
          select: {
            id: true,
            title: true,
            description: true,
            pdfUrl: true,
            imageUrl: true,
            fileName: true,
            fileSize: true,
            displayOrder: true,
            createdAt: true,
            updatedAt: true
          }
        }
      },
      orderBy: { displayOrder: 'asc' }
    });

    // Transform data for frontend consumption
    const transformedClasses = classes.map(cls => ({
      id: cls.id,
      name: cls.name,
      description: cls.description,
      items: cls.curriculumItems.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        pdfUrl: item.pdfUrl,
        imageUrl: item.imageUrl,
        fileName: item.fileName,
        fileSize: item.fileSize,
        hasPreview: !!item.imageUrl,
        hasPdf: !!item.pdfUrl
      }))
    }));

    return NextResponse.json({ 
      success: true, 
      data: transformedClasses 
    });
  } catch (error) {
    console.error('Error fetching curriculum:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch curriculum' },
      { status: 500 }
    );
  }
}