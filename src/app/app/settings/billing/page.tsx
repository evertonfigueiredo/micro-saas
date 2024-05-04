import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { createCheckoutSessionAction } from './action'
import { auth } from '@/services/auth'
import { getUserCurrentPlan } from '@/services/stripe'

export default async function Page() {
  const session = await auth()
  const plan = await getUserCurrentPlan(session?.user.id as string)

  return (
    <form action={createCheckoutSessionAction}>
      <Card>
        <CardHeader className="border-b border-border">
          <CardTitle>Planos e Uso</CardTitle>
          <CardDescription>
            O seu plano atual é o
            <span className="font-bold uppercase"> {plan.name}</span>. O
            validade do seu plano é: [next_due_date]
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-2">
            <header className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">
                {plan.quota.TASKS.current}/{plan.quota.TASKS.available}
              </span>
              <span className="text-muted-foreground text-sm">
                {plan.quota.TASKS.usage}%
              </span>
            </header>
            <main>
              <Progress value={plan.quota.TASKS.usage} />
            </main>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t pt-6">
          <span>Para um maior limite assine o nosso plano PRO.</span>
          <Button type="submit">Assine por R$9/mês</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
