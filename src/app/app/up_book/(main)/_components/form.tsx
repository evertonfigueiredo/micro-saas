'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { uploadEbookSchema } from '../schema'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { SheetFooter } from '@/components/ui/sheet'
import { uploadFile } from '../actions'
import { toast } from '@/components/ui/use-toast'
import { useState } from 'react'

export function UpBook() {
  const [statusButton, setStatusButton] = useState(true)
  const form = useForm<z.infer<typeof uploadEbookSchema>>({
    resolver: zodResolver(uploadEbookSchema),
  })

  const fileRef = form.register('file')

  const onSubmit = async (data: z.infer<typeof uploadEbookSchema>) => {
    setStatusButton(false)
    const formData = new FormData()

    const file = data.file

    if (file.length === 0 || data.name === '') {
      toast({
        title: 'Error',
        description: 'Você deve preencher todos os campos.',
      })
      setStatusButton(true)
      return
    }

    // const formData = new FormData()
    formData.append('name', data.name)

    const reader = new FileReader()
    reader.onload = async function (e) {
      if (e.target?.result) {
        const blob = new Blob(
          [new Uint8Array(e.target.result as ArrayBuffer)],
          {
            type: file.type,
          },
        )
        formData.append('file', blob)
        const result = await uploadFile(formData)

        toast({
          title: result.status,
          description: result.message,
        })
        form.reset({ name: '', file: null })
        setStatusButton(true)
      } else {
        console.error('Falha ao criar arquivo Blob')
      }
    }
    await reader.readAsArrayBuffer(file[0])
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Nome</CardTitle>
            <CardDescription>
              Este será o nome exibido para o seu E-book.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do E-book</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload do E-book</CardTitle>
            <CardDescription>
              Você deve enviar seu E-book no formato PDF.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="file"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Upload do E-book</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        placeholder="shadcn"
                        accept="application/pdf"
                        {...fileRef}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          </CardContent>
        </Card>

        <SheetFooter className="mt-auto">
          <Button disabled={!statusButton} type="submit">
            {!statusButton && 'Enviando...'}
            {statusButton && 'Enviar E-book'}
          </Button>
        </SheetFooter>
      </form>
    </Form>
  )
}
