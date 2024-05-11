import { z } from 'zod'

export const sendBookSchema = z.object({
  email: z.string(),
  name: z.string(),
  ebook: z.string(),
})
