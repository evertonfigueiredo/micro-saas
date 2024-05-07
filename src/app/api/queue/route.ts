import { NextResponse } from 'next/server'
import { sampleQueue } from '@/workers/sendBook.worker'

export async function GET() {
  const data = {
    // any serializable data you want to provide for the job
    // for this example, we'll provide a message
    message: 'Enviou o ebook',
  }
  await sampleQueue.add('sendBook', data)

  return NextResponse.json({ status: 'Message added to the queue' })
}
