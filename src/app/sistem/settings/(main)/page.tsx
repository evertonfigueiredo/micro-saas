import { auth } from '@/services/auth'
import { ProfileForm } from './_componentes/form'

export default async function Page() {
  const session = await auth()

  return (
    <ProfileForm
      defaultValues={
        session?.user || {
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
      }
    />
  )
}
