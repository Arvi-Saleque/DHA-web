import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const [advisoryCommittee, committeeMembers] = await Promise.all([
      prisma.advisoryCommittee.findUnique({ where: { id: 1 } }),
      prisma.committeeMember.findMany({ 
        where: { isActive: true }, 
        orderBy: { displayOrder: 'asc' } 
      })
    ]);

    return NextResponse.json({
      advisoryCommittee,
      committeeMembers
    });
  } catch (error) {
    console.error('Error fetching Advisory Committee data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Advisory Committee data' },
      { status: 500 }
    );
  }
}