import dotenv from 'dotenv'
import fetch from 'node-fetch'

import { history, stats, tokens } from './constants'

dotenv.config()

const success = (body) => ({
  statusCode: 200,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
})

const failure = (body) => ({
  statusCode: 400,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
})

const fetchQuery = async (query) => {
  const res = await fetch('https://sql.transpose.io', {
    headers: {
      'X-API-KEY': process.env.VUE_APP_TRANSPOSE_API_KEY,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ sql: query }),
  }).then((response) => response.json())

  if (res.status === 'success') {
    return res.results
  } else {
    return res
  }
}

const sleep = async (milis = 2000) => {
  return new Promise((resolve) => setTimeout(resolve, milis))
}

// TODO remove sleeps, they're currently there because of Transpose's 3
// queries/second rate limit. We will avoid this limitation on the higher tier
// and by caching requests on Cloudflare Workers.
export const handler = async function (event) {
  switch (event.queryStringParameters.query) {
    case 'stats': {
      await sleep(1000)
      const vita = (await fetchQuery(stats))[0]
      return success({
        treasury: { totalUsdValue: '25,016,640', weeklyUsdChange: '+14% ($3,079,104)' },
        vita,
        totalInvestment: '424,242',
      })
    }
    case 'tokens':
      sleep(500)
      return success(await fetchQuery(tokens))
    case 'history':
      return success(await fetchQuery(history))
    default:
      return failure({
        status: 'error',
        message: 'Invalid query value',
      })
  }
}
