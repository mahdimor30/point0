import { getMe } from '@/lib/auth/server'
import { root } from '@/lib/root'

export const getMeQuery = root
  .lets('query', 'getMe')
  .loader(async () => ({ me: await getMe() }))
  .query({ staleTime: Infinity })