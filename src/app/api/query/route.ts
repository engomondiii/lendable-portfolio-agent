import { NextRequest, NextResponse } from 'next/server';

const DJANGO_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.question || typeof body.question !== 'string') {
      return NextResponse.json(
        { message: 'Invalid request: question is required' },
        { status: 400 }
      );
    }

    const djangoResponse = await fetch(`${DJANGO_BASE_URL}/api/query/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Forward any auth headers if needed later
        ...(request.headers.get('authorization')
          ? { Authorization: request.headers.get('authorization')! }
          : {}),
      },
      body: JSON.stringify({ question: body.question }),
      // Generous timeout — Claude generation takes time
      signal: AbortSignal.timeout(90_000),
    });

    const data = await djangoResponse.json();

    if (!djangoResponse.ok) {
      return NextResponse.json(
        {
          message: data.message || data.detail || 'Backend error',
          detail: data.detail,
          sql: data.sql,
        },
        { status: djangoResponse.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    console.error('[API Proxy] Query error:', error);

    if (error instanceof Error && error.name === 'TimeoutError') {
      return NextResponse.json(
        { message: 'Request timed out. The query took too long.' },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { message: 'Failed to connect to the analytics backend.' },
      { status: 502 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: 'Query proxy active' }, { status: 200 });
}