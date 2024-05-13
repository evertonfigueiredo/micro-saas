import { z } from 'zod'

export const createTagSchema = z.object({
  name: z.string(),
})

export const deleteTagSchema = z.object({
  id: z.string(),
})
