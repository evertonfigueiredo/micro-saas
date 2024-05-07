'use client'

import { toast } from '@/components/ui/use-toast'
import { SheetFooter } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { sendBook } from '../actions'

export function ProfileForm() {
  const onSubmit = async () => {
    const data = {
      message: 'Nome de email',
    }

    await sendBook(data)

    toast({
      title: 'Sucesso',
      description: 'Seu perfil foi atualizado com sucesso.',
    })
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Nome</CardTitle>
          <CardDescription>
            Este será o nome exibido publicamente.
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>

      <SheetFooter className="mt-auto">
        <Button onClick={onSubmit}>Enviar E-book</Button>
      </SheetFooter>
    </div>
  )
}
