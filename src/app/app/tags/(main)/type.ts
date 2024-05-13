import { ReturnTypeWithoutPromise } from '@/types/return-type-witchout-promise'
import { getTags } from './actions'

export type Tag = ReturnTypeWithoutPromise<typeof getTags>[0]
