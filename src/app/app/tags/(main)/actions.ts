'use server'

import { auth } from '@/services/auth'
import { prisma } from '@/services/database'
import { deleteTagSchema } from './schema'
import { z } from 'zod'

export async function getTags() {
  const session = await auth()

  const tags = await prisma.tag.findMany({
    where: {
      userId: session?.user?.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  await prisma.$disconnect()
  return tags
}

export async function deleteTag(input: z.infer<typeof deleteTagSchema>) {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      success: false,
      message: 'Não autorizado',
      data: null,
    }
  }

  const tag = await prisma.tag.findUnique({
    where: {
      id: input.id,
      userId: session?.user?.id,
    },
    select: {
      id: true,
    },
  })

  if (!tag) {
    await prisma.$disconnect()
    return {
      success: false,
      message: 'Tag não encontrada.',
      data: null,
    }
  }

  await prisma.tag.delete({
    where: {
      id: input.id,
      userId: session?.user?.id,
    },
  })
  await prisma.$disconnect()
  return {
    success: true,
    message: 'Tag deletada com sucesso.',
    data: null,
  }
}
