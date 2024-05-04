export const config = {
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    plans: {
      free: {
        priceId: 'price_1PBM40P8AxlGqivH7xYBggbp',
        quota: {
          TASKS: 100,
        },
      },
      pro: {
        priceId: 'price_1PBM4EP8AxlGqivHap08O7Kf',
        quota: {
          TASKS: 1000,
        },
      },
    },
  },
}
