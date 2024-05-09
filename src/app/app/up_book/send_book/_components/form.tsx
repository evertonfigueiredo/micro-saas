'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { sendBook } from '../actions'
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

export function SendForm() {
  const router = useRouter()

  const form = useForm<z.infer<typeof sendBookSchema>>({
    resolver: zodResolver(sendBookSchema),
  })

  const onSubmit = form.handleSubmit(async (data) => {
    const result = await sendBook(data)
    router.refresh()

    if (result.success) {
      toast({
        title: 'Sucesso',
        description: 'Seu e-book foi enviado com sucesso.',
      })
    } else {
      toast({
        title: 'Error',
        description: 'Algo de errado aconteceu, tente novamente mais tarde.',
      })
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
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
                    <Input placeholder="Digite o email" {...field} />
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
  )
}
