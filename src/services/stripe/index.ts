import Stripe from 'stripe'

import { config } from '@/config'
import { prisma } from '../database'

export const stripe = new Stripe(config.stripe.secretKey || '', {
  apiVersion: '2024-04-10',
  httpClient: Stripe.createFetchHttpClient(),
})

export const getStripeCustomerByEmail = async (email: string) => {
  const customers = await stripe.customers.list({ email })
  return customers.data[0]
}

export const createStripeCustomer = async (input: {
  name?: string
  email: string
}) => {
  const customer = await getStripeCustomerByEmail(input.email)
  if (customer) return customer

  const createdCustomer = await stripe.customers.create({
    email: input.email,
    name: input.name,
  })

  const createdCustomSubscription = await stripe.subscriptions.create({
    customer: createdCustomer.id,
    items: [{ price: config.stripe.plans.free.priceId }],
  })

  await prisma.user.update({
    where: {
      email: input.email,
    },
    data: {
      stripeCustomerId: createdCustomer.id,
      stripeSubscriptionId: createdCustomSubscription.id,
      stripeSubscriptionStatus: createdCustomSubscription.status,
      stripePriceId: config.stripe.plans.free.priceId,
    },
  })

  await prisma.$disconnect()

  return createdCustomer
}

export const createCheckoutSession = async (
  userId: string,
  userEmail: string,
  userStripeSubscriptionId: string,
) => {
  try {
    const customer = await createStripeCustomer({
      email: userEmail,
    })

    const subscription = await stripe.subscriptionItems.list({
      subscription: userStripeSubscriptionId,
      limit: 1,
    })

    const session = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: 'http://localhost:3000/app/settings/billing',
      flow_data: {
        type: 'subscription_update_confirm',
        after_completion: {
          type: 'redirect',
          redirect: {
            return_url:
              'http://localhost:3000/app/settings/billing?success=true',
          },
        },
        subscription_update_confirm: {
          subscription: userStripeSubscriptionId,
          items: [
            {
              id: subscription.data[0].id,
              price: config.stripe.plans.pro.priceId,
              quantity: 1,
            },
          ],
        },
      },
    })

    // Cria assinatura sem atualizar o plano
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ['card'],
    //   mode: 'subscription',
    //   client_reference_id: userId,
    //   customer: customer.id,
    //   success_url: `http://localhost:3000/app/settings/billing?success=true`,
    //   cancel_url: `http://localhost:3000/app/settings/billing?success=false`,
    //   line_items: [
    //     {
    //       price: config.stripe.plans.pro.priceId,
    //       quantity: 1,
    //     },
    //   ],
    // })

    return {
      url: session.url,
    }
  } catch (error) {
    throw new Error('Error to create checkout session')
  }
}

export const handleProcessWebhookUpdatedSubscription = async (event: {
  object: Stripe.Subscription
}) => {
  const stripeCustomerId = event.object.customer as string
  const stripeSubscriptionId = event.object.id as string
  const stripeSubscriptionStatus = event.object.status
  const stripePriceId = event.object.items.data[0].price.id

  const userExists = await prisma.user.findFirst({
    where: {
      OR: [
        {
          stripeSubscriptionId,
        },
        {
          stripeCustomerId,
        },
      ],
    },
    select: {
      id: true,
    },
  })

  if (!userExists) {
    await prisma.$disconnect()
    throw new Error('user of stripeCustomerId not found')
  }

  await prisma.user.update({
    where: {
      id: userExists.id,
    },
    data: {
      stripeCustomerId,
      stripeSubscriptionId,
      stripeSubscriptionStatus,
      stripePriceId,
    },
  })

  await prisma.$disconnect()
}

type Plan = {
  priceId: string
  quota: {
    TASKS: number
  }
}

type Plans = {
  [key: string]: Plan
}

export const getPlanByPrice = (priceId: string) => {
  const plans: Plans = config.stripe.plans

  const planKey = Object.keys(plans).find(
    (key) => plans[key].priceId === priceId,
  ) as keyof Plans | undefined

  const plan = planKey ? plans[planKey] : null

  if (!plan) {
    throw new Error(`Plan not found for priceId: ${priceId}`)
  }

  return {
    name: planKey,
    quota: plan.quota,
  }
}

export const getUserCurrentPlan = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      stripePriceId: true,
    },
  })

  if (!user || !user.stripePriceId) {
    await prisma.$disconnect()
    throw new Error('Esse usuário não encontrou stripePriceId')
  }

  const plan = getPlanByPrice(user.stripePriceId)

  const tasksCount = await prisma.todo.count({
    where: {
      userId,
    },
  })

  const availableTasks = plan.quota.TASKS
  const currentTasks = tasksCount
  const usage = (currentTasks / availableTasks) * 100

  await prisma.$disconnect()

  return {
    name: plan.name,
    quota: {
      TASKS: {
        available: availableTasks,
        current: currentTasks,
        usage,
      },
    },
  }
}
