import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Public endpoint to fetch all syllabus classes with their items
export async function GET() {
  try {
    const classes = await prisma.syllabusClass.findMany({
      where: { isActive: true },
      include: {
        syllabusItems: {
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
            updatedAt: true,
          },
        },
      },
      orderBy: { displayOrder: 'asc' },
    });

    const transformed = classes.map((cls) => ({
      id: cls.id,
      name: cls.name,
      description: cls.description,
      items: cls.syllabusItems.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        pdfUrl: item.pdfUrl,
        imageUrl: item.imageUrl,
        fileName: item.fileName,
        fileSize: item.fileSize,
        hasPreview: !!item.imageUrl,
        hasPdf: !!item.pdfUrl,
      })),
    }));

    return NextResponse.json({ success: true, data: transformed });
  } catch (error) {
    console.error('Error fetching syllabus:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch syllabus' },
      { status: 500 },
    );
  }
}