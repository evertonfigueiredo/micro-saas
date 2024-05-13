'use server'

import { auth } from '@/services/auth'
import { prisma } from '@/services/database'
import { createTagSchema } from './schema'
import { z } from 'zod'

export async function createTag(input: z.infer<typeof createTagSchema>) {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'Não autorizado',
      data: null,
    }
  }

  try {
    const search = await prisma.tag.findFirst({
      where: {
        title: input.name,
      },
    })

    if (search) {
      return {
        success: true,
        message: 'Já existe uma Tag com esse nome.',
        data: {},
      }
    }

    const tag = await prisma.tag.create({
      data: {
        title: input.name,
        userId: session?.user?.id,
      },
    })

    await prisma.$disconnect()
    return {
      success: true,
      message: 'Sua tag foi criada com sucesso.',
      data: tag,
    }
  } catch (error) {
    console.error(error)
  }
}
