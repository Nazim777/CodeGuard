import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import prisma from '../../../lib/prisma';

export async function GET() {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  const reviews = await prisma.codeReview.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });
  
  return NextResponse.json(reviews);
}