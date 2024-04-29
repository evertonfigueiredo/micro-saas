'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useRef } from 'react'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Todo } from '../type'

type TodoUpsertSheetsProps = {
  children?: React.ReactNode
  defaultValue?: Todo
}

export function TodoUpsertSheet({ children }: TodoUpsertSheetsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const form = useForm()

  const onSubmit = form.handleSubmit((data) => {
    console.log(data)
  })

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div ref={ref}>{children}</div>
      </SheetTrigger>
      <SheetContent>
        <Form {...form}>
          <form
            onSubmit={onSubmit}
            className="space-y-8 h-screen flex flex-col"
          >
            <div>
              <SheetHeader>
                <SheetTitle>Atualizar Tarefa</SheetTitle>
                <SheetDescription>
                  Informe o titulo da tarefa a ser atualizada.
                </SheetDescription>
              </SheetHeader>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titulo</FormLabel>
                    <FormControl>
                      <Input placeholder="Titulo da sua tarefa" {...field} />
                    </FormControl>
                    <FormDescription>
                      Nome da tarefa que vai ser mostrado
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <SheetFooter className="mt-auto">
              <Button type="submit">Salvar</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
