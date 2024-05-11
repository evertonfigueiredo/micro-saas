'use server'

import { auth } from '@/services/auth'
import { prisma } from '@/services/database'

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
