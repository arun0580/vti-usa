import "server-only";

type Bucket = {
  count: number;
  resetAt: number;
};

const WINDOW_MS = 60 * 1_000;
const MAX_REQUESTS = 5;

const buckets = new Map<string, Bucket>();
let lastSweep = Date.now();

function sweep(now: number) {
  if (now - lastSweep < WINDOW_MS) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
  lastSweep = now;
}

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

/**
 * In-memory IP-based rate limiter. Suitable for low-volume marketing
 * forms running on a single Node instance. For multi-instance or
 * serverless deployments, swap this implementation for an external
 * store (Upstash, Vercel KV, Redis) without changing call sites.
 */
export function checkRateLimit(
  key: string,
  {
    limit = MAX_REQUESTS,
    windowMs = WINDOW_MS,
  }: { limit?: number; windowMs?: number } = {},
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  if (bucket.count >= limit) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  bucket.count += 1;
  return {
    ok: true,
    remaining: limit - bucket.count,
    retryAfterSeconds: 0,
  };
}

/**
 * Best-effort client IP extraction from common proxy headers.
 * Falls back to a constant key so the limiter still applies in
 * environments where IP information is unavailable.
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "anonymous";
}
