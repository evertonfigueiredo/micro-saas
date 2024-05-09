import { z } from 'zod'

// const ACCEPTED_IMAGE_TYPES = ['application/pdf']
// const MAX_IMAGE_SIZE = 5 // In MegaBytes

// const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
//   const result = sizeInBytes / (1024 * 1024)
//   return +result.toFixed(decimalsNum)
// }

// const ACCERPTED_FILE_TYPES = ['pdf']

export const uploadEbookSchema = z.object({
  file: z.any(),
  name: z.string(),
})
