import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { PrismaClient } from '@prisma/client';

type SearchUserParams = {
  queryString: string;
  participants: string;
};

interface IRequest extends NextRequest {
  json: () => Promise<SearchUserParams>;
}

const prisma = new PrismaClient();

export async function GET(request: IRequest) {
  const params = new URL(request.nextUrl).searchParams;
  const queryString = params.get('queryString');
  const hasParticipants = params.has('participants');
  const alreadySelected = hasParticipants ? params.get('participants') : '';

  if (queryString !== null) {
    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: queryString.toLocaleLowerCase(),
          mode: 'insensitive',
          notIn: alreadySelected!.split(','),
        },
      },
    });

    try {
      return NextResponse.json(users, {
        status: 200,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return NextResponse.json({ error: error.message }, { status: 422 });
      }

      return NextResponse.json({ error: error }, { status: 500 });
    }
  }
}
