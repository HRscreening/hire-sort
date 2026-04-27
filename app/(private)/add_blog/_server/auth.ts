import 'server-only';
import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'admin_session';
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

export function verifyAdminKey(rawKey: string): boolean {
  const expected = process.env.ADMIN_KEY_HASH;
  if (!expected) return false;
  return constantTimeEqualHex(sha256Hex(rawKey), expected.toLowerCase());
}

function getSessionSecret(): string {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s) throw new Error('ADMIN_SESSION_SECRET env var is not set');
  return s;
}

function signToken(expiresAt: number): string {
  const payload = String(expiresAt);
  const sig = createHmac('sha256', getSessionSecret()).update(payload).digest('hex');
  return `${payload}.${sig}`;
}

function verifyToken(token: string | undefined): boolean {
  if (!token) return false;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return false;
  const expected = createHmac('sha256', getSessionSecret()).update(payload).digest('hex');
  if (!constantTimeEqualHex(sig, expected)) return false;
  const expiresAt = Number(payload);
  if (!Number.isFinite(expiresAt)) return false;
  return Date.now() < expiresAt;
}

export async function startAdminSession(): Promise<void> {
  const expiresAt = Date.now() + SESSION_TTL_SECONDS * 1000;
  const token = signToken(expiresAt);
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function hasAdminSession(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get('admin_session')?.value);
}
