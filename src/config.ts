export const config = {
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY,
    webhookSecret:
      'whsec_17a14e2622bead06a4132460bb6ea5a4a9b3a14e8c81f7cb7ebaa73f4cd770e5',
    plans: {
      free: {
        priceId: 'price_1PBM40P8AxlGqivH7xYBggbp',
        quota: {
          TASKS: 5,
        },
      },
      pro: {
        priceId: 'price_1PBM4EP8AxlGqivHap08O7Kf',
        quota: {
          TASKS: 100,
        },
      },
    },
  },
}
