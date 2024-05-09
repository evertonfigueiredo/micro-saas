'use server'

import { auth } from '@/services/auth'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getUrlBooks() {
  const session = await auth()

  const url = `${process.env.CLOUDFLARE_URL_PUBLIC}/${session?.user.id}/1715286943219-Teste.pdf`

  return url
}
