import Redis from 'ioredis'

const redis = new Redis({
  url: 'https://us1-super-eft-42993.upstash.io',
  token:
    'AafxASQgYTdlOGUwNGItYjIxMS00MDQ4LTkxYjgtNWU3MjhlZmY0YTMzMWE4OTg4YTM3OTBkNGEwNDk0MmQ3NDJlZTc0ZTY1MjI=',
})

const data = await redis.set('foo', 'bar')

console.log(data)
