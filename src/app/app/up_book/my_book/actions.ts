'use server'

import { auth } from '@/services/auth'
import { prisma } from '@/services/database'
import { deleteEbookSchema } from './schema'
import { z } from 'zod'
import { r2 } from '@/services/cloudflare'
import { DeleteObjectCommand } from '@aws-sdk/client-s3'

export async function getUserEbooks() {
  const session = await auth()

  const todos = await prisma.ebook.findMany({
    where: {
      userId: session?.user?.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  await prisma.$disconnect()
  return todos
}

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

export async function deleteEbook(input: z.infer<typeof deleteEbookSchema>) {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'Não autorizado',
      data: null,
    }
  }

  const ebook = await prisma.ebook.findUnique({
    where: {
      id: input.ebookId,
      userId: session?.user?.id,
    },
    select: {
      id: true,
    },
  })

  if (!ebook) {
    await prisma.$disconnect()
    return {
      error: 'Não encontrado.',
      data: null,
    }
  }

  const params = {
    Bucket: 'saas',
    Key: `${session?.user?.id}/${input.ebookName}`, // Caminho do objeto que você quer deletar
  }

  const deleteObjectCommand = new DeleteObjectCommand(params)

  try {
    const response = await r2.send(deleteObjectCommand)
    console.log('Objeto deletado com sucesso:', response)
  } catch (error) {
    console.error(error)

    throw error
  }

  await prisma.ebook.delete({
    where: {
      id: input.ebookId,
      userId: session?.user?.id,
    },
  })
  await prisma.$disconnect()
  return {
    error: null,
    data: 'E-book deletado com sucesso.',
  }
}
