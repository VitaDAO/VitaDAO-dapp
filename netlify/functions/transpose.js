import dotenv from 'dotenv'
import fetch from 'node-fetch'

import { history, tokens, vita } from './constants'

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

const fetchQuery = async (body) => {
  const res = await fetch('https://sql.transpose.io', {
    headers: {
      'X-API-KEY': process.env.VUE_APP_TRANSPOSE_API_KEY,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(body),
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

const intervalDictionary = {
  // TODO week history looks weird
  '1W': '1 week',
  '1M': '1 month',
  '1Y': '1 year',
  // TODO actually calc max period, not hardcode
  Max: '1 year 7 month',
}

// TODO remove sleeps, they're currently there because of Transpose's 3
// queries/second rate limit. We will avoid this limitation on the higher tier
// and by caching requests on Cloudflare Workers.
export const handler = async function (event) {
  switch (event.queryStringParameters.query) {
    case 'stats': {
      await sleep(1000)
      return success({
        vita: (await fetchQuery({ sql: vita }))[0],
        totalInvestment: '424,242',
      })
    }
    case 'tokens':
      sleep(500)
      return success(await fetchQuery({ sql: tokens }))
    case 'history':
      return success(
        await fetchQuery({
          sql: history,
          parameters: {
            wallet: '0xF5307a74d1550739ef81c6488DC5C7a6a53e5Ac2',
            interval: intervalDictionary[event.queryStringParameters.interval],
            samples: '299',
          },
        }),
      )
    default:
      return failure({
        status: 'error',
        message: 'Invalid query value',
      })
  }
}
