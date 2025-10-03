import { kv } from '@vercel/kv'
import { logger } from './logger'

interface RateLimitOptions {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Max requests per window
  keyPrefix: string // Prefix for KV keys
}

interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetTime: number
  retryAfter?: number
}

export class RateLimiter {
  constructor(private options: RateLimitOptions) {}

  async check(identifier: string): Promise<RateLimitResult> {
    const key = `${this.options.keyPrefix}:${identifier}`
    const now = Date.now()
    const windowKey = `${key}:${Math.floor(now / this.options.windowMs)}`

    try {
      const current = await kv.get<number>(windowKey) || 0

      if (current >= this.options.maxRequests) {
        const resetTime = (Math.floor(now / this.options.windowMs) + 1) * this.options.windowMs

        return {
          allowed: false,
          remaining: 0,
          resetTime,
          retryAfter: Math.ceil((resetTime - now) / 1000)
        }
      }

      // Increment counter
      const newCount = await kv.incr(windowKey)

      // Set expiry if first request in window
      if (newCount === 1) {
        await kv.expire(windowKey, Math.ceil(this.options.windowMs / 1000))
      }

      return {
        allowed: true,
        remaining: this.options.maxRequests - newCount,
        resetTime: (Math.floor(now / this.options.windowMs) + 1) * this.options.windowMs
      }
    } catch (error) {
      logger.error('rate_limit_check_failed', error as Error, { metadata: { identifier } })
      // Allow request on KV failure to avoid blocking legitimate users
      return {
        allowed: true,
        remaining: this.options.maxRequests - 1,
        resetTime: now + this.options.windowMs
      }
    }
  }
}

// Pre-configured rate limiters
export const emailRateLimiter = new RateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 5,
  keyPrefix: 'ratelimit:email'
})

export const ipRateLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 10,
  keyPrefix: 'ratelimit:ip'
})