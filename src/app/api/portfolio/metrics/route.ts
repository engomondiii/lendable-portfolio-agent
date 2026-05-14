import { NextRequest, NextResponse } from 'next/server';

const DJANGO_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export async function GET(request: NextRequest) {
  try {
    const djangoResponse = await fetch(
      `${DJANGO_BASE_URL}/api/portfolio/metrics/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(15_000),
      }
    );

    const data = await djangoResponse.json();

    if (!djangoResponse.ok) {
      return NextResponse.json(
        { message: data.message || data.detail || 'Backend error' },
        { status: djangoResponse.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    console.error('[Metrics Proxy] Error:', error);

    if (error instanceof Error && error.name === 'TimeoutError') {
      return NextResponse.json(
        { message: 'Metrics request timed out.' },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { message: 'Failed to connect to analytics backend.' },
      { status: 502 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}