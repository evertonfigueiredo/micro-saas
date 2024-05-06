import { PropsWithChildren } from 'react'
import { MainSidebar } from './_components/main-sidebar'
import { auth } from '@/services/auth'

interface User {
  id: string
  name: string | null
  email: string | null
  emailVerified: Date | null
  image: string | null
  stripeCustomerId: string | null
  stripeSubscriptionId: string | null
  stripeSubscriptionStatus: string | null
  stripePriceId: string | null
}

export default async function Layout({ children }: PropsWithChildren) {
  const session = await auth()

  // Verificar se session?.user é definido antes de passá-lo para MainSidebar
  const user: User = session?.user || {
    id: '',
    name: null,
    email: null,
    emailVerified: null,
    image: null,
    stripeCustomerId: null,
    stripeSubscriptionId: null,
    stripeSubscriptionStatus: null,
    stripePriceId: null,
  }

  return (
    <div className="grid grid-cols-[15rem_1fr]">
      <MainSidebar user={user} />
      <main>{children}</main>
    </div>
  )
}
