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

  data.from = `${session.user.name} <${session.user.email}>`

  try {
    // console.log(sampleQueue)

    // Adiciona um job à fila 'sendBook'
    await sampleQueue.add('sendBookMail', data, {
      attempts: 3,
    })

    return {
      success: true,
      message: 'Job enviado para a fila com sucesso',
    }
  } catch (error) {
    console.error('Erro ao enviar o job para a fila:', error)
    return {
      success: false,
      message: 'Erro ao enviar o job para a fila',
    }
  }
}
