import { ReturnTypeWithoutPromise } from '@/types/return-type-witchout-promise'
import { getUserTodos } from './actions'

export type Todo = ReturnTypeWithoutPromise<typeof getUserTodos>[0]
