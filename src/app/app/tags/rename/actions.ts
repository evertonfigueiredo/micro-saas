'use server'

import { auth } from '@/services/auth'
import { prisma } from '@/services/database'
import { z } from 'zod'
import { getTagSchema, updateTagSchema } from './schema'

export async function updateTag(input: z.infer<typeof updateTagSchema>) {
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

  const newTag = await prisma.tag.update({
    where: {
      id: input.id,
      userId: session?.user?.id,
    },
    data: {
      title: input.name,
    },
  })
  await prisma.$disconnect()
  return {
    success: true,
    message: 'Tag atualizada com sucesso.',
    data: newTag,
  }
}

export async function getTag(input: z.infer<typeof getTagSchema>) {
  const session = await auth()

  const tag = await prisma.tag.findFirst({
    where: {
      id: input.id,
      userId: session?.user?.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  await prisma.$disconnect()
  return tag
}
