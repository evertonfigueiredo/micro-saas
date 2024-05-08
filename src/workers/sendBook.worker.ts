// No arquivo sendBook.worker.ts

import { Worker, Queue } from 'bullmq'
import Redis from 'ioredis'
import 'dotenv/config'
import Mail from '../services/mail'

const connection = new Redis(
  `${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  { maxRetriesPerRequest: null },
)

export const sampleQueue = new Queue('sendBookMail', {
  connection,
  defaultJobOptions: {
    attempts: 2,
  },
})

const worker = new Worker(
  'sendBookMail',
  async (job) => {
    const data = job?.data
    try {
      // Envie o e-mail aqui
      Mail.from = data.from
      Mail.to = data.email
      Mail.subject = 'Seu E-book chegou'
      Mail.message = data.name

      await Mail.sendMail()
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error)
      throw error
    }
  },
  {
    connection,
    concurrency: 1,
    limiter: {
      max: 1,
      duration: 1000,
    },
  },
)

export default worker
