'use server'

import { auth } from '@/services/auth'
import { sampleQueue } from '@/workers/sendBook.worker'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function sendBook(data: any) {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'Não autoriazado',
      data: null,
    }
  }

  await sampleQueue.add('sendBook', data)
}
