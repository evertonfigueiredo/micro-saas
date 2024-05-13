'use server'

import { auth } from '@/services/auth'
import { prisma } from '@/services/database'
import { sampleQueue } from '@/workers/sendBook.worker'

export async function getUrlBooks() {
  const session = await auth()

  const ebooks = await prisma.ebook.findMany({
    where: {
      userId: session?.user?.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  const ebooksWithLinks = ebooks.map((ebook) => {
    const match = ebook.title.match(/\d+-(.+)/)
    let formattedTitle = match ? match[1] : ebook.title

    // DecodeURIComponent para corrigir caracteres acentuados na URL
    formattedTitle = decodeURIComponent(formattedTitle)

    return {
      ...ebook,
      link: `${process.env.CLOUDFLARE_URL_PUBLIC}/${ebook.userId}/${ebook.title}`,
      formattedTitle,
    }
  })

  await prisma.$disconnect()

  return ebooksWithLinks
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function sendBook(data: any) {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'Não autorizado',
      data: null,
    }
  }

  const ebook = await prisma.ebook.findUnique({
    where: {
      id: data.ebook,
    },
  })

  if (!ebook) {
    return {
      success: false,
      message: 'Error ao encontrar e-book.',
    }
  }

  data.link = `${process.env.CLOUDFLARE_URL_PUBLIC}/${ebook.userId}/${ebook.title}`

  data.from = `${session.user.name} <${session.user.email}>`

  const match = ebook.title.match(/\d+-(.+)/)
  const formattedTitle = match ? match[1] : ebook.title

  data.title = formattedTitle

  try {
    // console.log(data)

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
