import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

const SESSION_TTL_SECONDS = 60 * 60 * 2;

const sha256Hex = (s: string) => createHash('sha256').update(s).digest('hex');

const constantTimeEqualHex = (a: string, b: string) => {
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(Buffer.from(a, 'hex'), Buffer.from(b, 'hex'));
  } catch {
    return false;
  }
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ key: string }> },
) {
  const { key } = await params;
  const expected = process.env.ADMIN_KEY_HASH;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!expected || !secret || !constantTimeEqualHex(sha256Hex(key), expected.toLowerCase())) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const expiresAt = Date.now() + SESSION_TTL_SECONDS * 1000;
  const sig = createHmac('sha256', secret).update(String(expiresAt)).digest('hex');
  const token = `${expiresAt}.${sig}`;

  const store = await cookies();
  store.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  });

  return NextResponse.redirect(new URL('/add_blog', request.url));
}
