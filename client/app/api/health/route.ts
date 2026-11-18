import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Proxies a warm-up ping to the backend so the browser never needs the backend URL or CORS.
export async function GET() {
    const base = process.env.API_BASE_URL;
    if (!base) return NextResponse.json({ ok: false }, { status: 500 });

    try {
        const res = await fetch(`${base}/health`, {
            cache: 'no-store',
            signal: AbortSignal.timeout(45_000),
        });
        return NextResponse.json({ ok: res.ok }, { status: res.ok ? 200 : 503 });
    } catch {
        return NextResponse.json({ ok: false }, { status: 503 });
    }
}
