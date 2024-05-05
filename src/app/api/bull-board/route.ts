// src/app/api/bull-board/route.ts

import { createBullBoard } from '@bull-board/api'
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'
import { ExpressAdapter } from '@bull-board/express'
import express from 'express'
import { Queue } from 'bullmq'

// ... your queue definition

const basePath = '/api/bull-board'

const serverAdapter = new ExpressAdapter()
serverAdapter
  .setBasePath(basePath)
  .setViewsPath('../../node_modules/@bull-board/ui/dist')

createBullBoard({
  queues: [new BullMQAdapter(queue)],
  serverAdapter,
  options: { uiBasePath: '../../node_modules/@bull-board/ui', uiConfig: {} },
})

export async function GET(req: NextRequest) {
  // Handle GET request logic here (optional)
  return NextResponse.json({ message: 'This is a GET request response' })
}
