'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { createTagSchema } from '../../add_tag/schema'
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
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getTag, updateTag } from '../actions'
import { Tag } from '../../(main)/type'

export function TagForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const search = searchParams.get('id')

  const [tag, setTag] = useState<Tag>()

  useEffect(() => {
    async function featchTag() {
      if (search === null) {
        router.back()
      } else {
        const findTag = await getTag({ id: search })
        if (findTag) {
          setTag(findTag)
          form.reset({ name: findTag.title })
        }
      }
    }

    featchTag()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const form = useForm<z.infer<typeof createTagSchema>>({
    resolver: zodResolver(createTagSchema),
  })

  const onSubmit = form.handleSubmit(async (data) => {
    const result = await updateTag({ name: data.name, id: tag?.id as string })

    if (result?.success) {
      toast({
        title: 'Sucesso',
        description: result?.message,
      })
      router.back()
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
                {form.formState.isSubmitting && 'Atualizando...'}
                {!form.formState.isSubmitting && 'Atualizar Tag'}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </div>
    </ScrollArea>
  )
}
