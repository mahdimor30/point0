import { serverEnv } from '@/lib/env/server'
import { db } from '@/lib/db' // instance Drizzle خودت
import * as schema from '@/lib/db/schema'
import { env, getRequest } from '@point0/core'
import type { Request0 } from '@point0/core/request0'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

export const authServer = env.side.define.unsafe.server(
  betterAuth({
    database: drizzleAdapter(db, {
      provider: 'pg',
      schema, // اگه اسم جدول‌هات فرق داره: schema: { ...schema, user: schema.users }
    }),
    emailAndPassword: { enabled: true },
    secret: serverEnv.BETTER_AUTH_SECRET,
    baseURL: serverEnv.BETTER_AUTH_URL,
  }),
)

declare module '@point0/core/request0' {
  interface RequestCache {
    me?: Me | null
  }
}

export type Me = NonNullable<Awaited<ReturnType<typeof authServer.api.getSession>>>

export const getMe = async ({ request }: { request?: Request0 } = {}): Promise<Me | null> => {
  request ??= getRequest()
  if (request.cache.me !== undefined) return request.cache.me
  const me = await authServer.api.getSession({ headers: request.original.headers })
  request.cache.me = me
  return me
}