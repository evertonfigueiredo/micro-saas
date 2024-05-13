'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { createTag } from '../actions'
import { createTagSchema } from '../schema'
import { toast } from '@/components/ui/use-toast'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { SheetFooter } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

export function TagForm() {
  const form = useForm<z.infer<typeof createTagSchema>>({
    resolver: zodResolver(createTagSchema),
  })

  const onSubmit = form.handleSubmit(async (data) => {
    const result = await createTag(data)
    form.reset({ name: '' })

    if (result?.success) {
      toast({
        title: 'Sucesso',
        description: result?.message,
      })
    } else {
      toast({
        title: 'Error',
        description: result?.message,
      })
    }
  })

  return (
    <ScrollArea>
      <div className="h-[84vh]">
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-8 px-4">
            <Card>
              <CardHeader>
                <CardTitle>Nome</CardTitle>
                <CardDescription>
                  Este sera o nome de identificação da sua Tag.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          placeholder="Digite o nome"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <SheetFooter className="mt-auto">
              <Button disabled={form.formState.isSubmitting} type="submit">
                {form.formState.isSubmitting && 'Criando...'}
                {!form.formState.isSubmitting && 'Criar Tag'}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </div>
    </ScrollArea>
  )
}
