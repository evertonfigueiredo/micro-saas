import { Worker, Queue } from 'bullmq'
import Redis from 'ioredis'
import 'dotenv/config'

console.log(process.env.REDIS_PORT)

const connection = new Redis({
  host: process.env.REDIS_HOST as string,
  port: parseInt(process.env.REDIS_PORT as string),
  maxRetriesPerRequest: null,
})

export const sampleQueue = new Queue('sendBook', {
  connection,
  defaultJobOptions: {
    attempts: 2,
  },
})

const worker = new Worker(
  'sendBook', // this is the queue name, the first string parameter we provided for Queue()
  async (job) => {
    const data = job?.data

    console.log(data.message)
  },
  {
    connection,
  },
)

export default worker
