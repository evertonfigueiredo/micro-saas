import { z } from 'zod'

export const getTagSchema = z.object({
  id: z.string(),
})

export const updateTagSchema = z.object({
  id: z.string(),
  name: z.string(),
})
