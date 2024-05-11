import { ReturnTypeWithoutPromise } from '@/types/return-type-witchout-promise'
import { getUserEbooks } from './actions'

export type Ebook = ReturnTypeWithoutPromise<typeof getUserEbooks>[0]
