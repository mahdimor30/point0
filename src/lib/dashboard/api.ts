import { db } from '@/lib/db'
import * as schema from '@/lib/db/schema'
import { root } from '@/lib/root'
import { count, gte } from 'drizzle-orm'

export const getDashboardStatsQuery = root
  .lets('query', 'getDashboardStats')
  .loader(async () => {
    const since = new Date()
    since.setDate(since.getDate() - 7)

    const [{ total } = { total: 0 }] = await db
      .select({ total: count() })
      .from(schema.user)

    const [{ newThisWeek } = { newThisWeek: 0 }] = await db
      .select({ newThisWeek: count() })
      .from(schema.user)
      .where(gte(schema.user.createdAt, since))

    const [{ sessions } = { sessions: 0 }] = await db
      .select({ sessions: count() })
      .from(schema.session)
      .where(gte(schema.session.expiresAt, new Date()))

    return {
      stats: {
        totalUsers: total,
        newThisWeek,
        activeSessions: sessions,
      },
    }
  })
  .query({ staleTime: 60_000 })