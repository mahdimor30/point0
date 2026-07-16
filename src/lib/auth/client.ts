import { clientEnv } from '@/lib/env/client'
import { env } from '@point0/core'
import { createAuthClient } from 'better-auth/react'

export const authClient = env.side.define.unsafe.client(
  createAuthClient({ baseURL: clientEnv.BETTER_AUTH_URL }),
)