import { getMeQuery } from '@/lib/auth/api'
import { getMe } from '@/lib/auth/server'
import { AppError } from '@/lib/error'
import { redirect } from '@/lib/navigation'
import { Point0 } from '@point0/core'

export const mePlugin = Point0.lets('plugin', 'me')
  .onPrefetchPage(async () => { await getMeQuery.prefetchQuery() })
  .ctx(async ({ request }) => ({ me: await getMe({ request }) }))
  .with(({ resolve }) => resolve(getMeQuery.useQuery(), ({ data }) => ({ me: data.me })))
  .plugin()

export const redirectUnauthorizedPlugin = Point0.lets('plugin', 'redirectUnauthorized')
  .use(mePlugin)
  .ctx(({ ctx: { me } }) => (me ? { me } : redirect('signIn')))
  .with(({ props: { me } }) => (me ? { me } : redirect('signIn')))
  .plugin()

export const redirectAuthorizedPlugin = Point0.lets('plugin', 'redirectAuthorized')
  .use(mePlugin)
  .ctx(({ ctx: { me } }) => (me ? redirect('home') : { me }))
  .with(({ props: { me } }) => (me ? redirect('home') : { me }))
  .plugin()

export const authorizedOnlyPlugin = Point0.lets('plugin', 'authorizedOnly')
  .use(mePlugin)
  .ctx(({ ctx: { me } }) => {
    if (!me) throw new AppError('Only for authorized users', { code: 'UNAUTHORIZED' })
    return { me }
  })
  .with(({ props: { me } }) => {
    if (!me) return new AppError('Only for authorized users', { code: 'UNAUTHORIZED' })
    return { me }
  })
  .plugin()