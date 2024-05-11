import { z } from 'zod'

export const deleteEbookSchema = z.object({
  ebookId: z.string(),
  ebookName: z.string(),
})
