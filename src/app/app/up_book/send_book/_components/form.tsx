'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { getUrlBooks, sendBook } from '../actions'
import { sendBookSchema } from '../schema'
import { toast } from '@/components/ui/use-toast'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'

type Ebook = {
  link: string
  formattedTitle: string
  id: string
  title: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

export function SendForm() {
  const router = useRouter()

  const [ebooks, setEbooks] = useState<Ebook[]>([])
  const [formKey, setFormKey] = useState(0)

  useEffect(() => {
    async function fetchEbooks() {
      const fetchedEbooks = await getUrlBooks()
      setEbooks(fetchedEbooks)
    }

    fetchEbooks()
  }, [])

  const form = useForm<z.infer<typeof sendBookSchema>>({
    resolver: zodResolver(sendBookSchema),
  })

  const onSubmit = form.handleSubmit(async (data) => {
    const result = await sendBook(data)
    setFormKey(formKey + 1)
    form.reset({ email: '', name: '' })

    if (result.success) {
      toast({
        title: 'Sucesso',
        description: 'Seu e-book foi enviado com sucesso.',
      })
    } else {
      toast({
        title: 'Error',
        description: result.message,
      })
    }
  })

  return (
    <ScrollArea>
      <div className="h-[84vh]">
        <Form {...form} key={formKey}>
          <form onSubmit={onSubmit} className="space-y-8 px-4">
            <Card>
              <CardHeader>
                <CardTitle>Nome</CardTitle>
                <CardDescription>
                  Este será o nome exibido publicamente.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Pessoa</FormLabel>
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

            <Card>
              <CardHeader>
                <CardTitle>Nome</CardTitle>
                <CardDescription>
                  Este será o nome exibido publicamente.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="ebook"
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value) // Atualize o valor do campo usando onChange
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o e-book para envio." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>E-books</SelectLabel>
                          {ebooks.map((ebook) => (
                            <SelectItem key={ebook.id} value={ebook.id}>
                              {ebook.formattedTitle}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Email da Pessoa</CardTitle>
                <CardDescription>
                  E-mail do destinatário do seu E-book
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          autoComplete="off"
                          placeholder="Digite o email"
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
                {form.formState.isSubmitting && 'Enviando...'}
                {!form.formState.isSubmitting && 'Enviar E-book'}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </div>
    </ScrollArea>
  )
}
