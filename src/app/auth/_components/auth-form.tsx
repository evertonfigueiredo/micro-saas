'use client'

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { toast } from '@/components/ui/use-toast'

export function AuthForm() {
  const form = useForm()

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await signIn('nodemailer', {
        redirect: false,
        email: data.email,
        callbackUrl: '',
      })
      toast({
        title: 'Email de Login enviado.',
        description: 'Check seu email para acessar o link de login.',
      })
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro. Tente novamente mais tarde.',
      })
    }
  })

  return (
    <section className="flex h-screen w-full items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold">Sistem Geren</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Digite seu endereço de e-mail e enviaremos um link para fazer login.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="Insira seu E-mail"
                required
                type="email"
                {...form.register('email')}
              />
            </div>
            <Button
              className="w-full"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? 'Enviando Link'
                : 'Enviar link de Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}
