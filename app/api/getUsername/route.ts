import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id')!;

  const user = await prisma.user.findUnique({
    where: {
      id: +id,
    },
  });

  const username = user?.name;
  return NextResponse.json({ username });
}
