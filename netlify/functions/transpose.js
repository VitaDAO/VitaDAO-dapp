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
      'X-API-KEY': process.env.TRANSPOSE_API_KEY,
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

export const handler = async function (event) {
  switch (event.queryStringParameters.query) {
    case 'stats': {
      await sleep()
      const vita = (await fetchQuery(stats))[0]
      return success({
        treasury: { totalUsdValue: '25,016,640', weeklyUsdChange: '+14% ($3,079,104)' },
        vita,
        totalInvestment: '424,242',
      })
    }
    case 'tokens':
      return success(await fetchQuery(tokens))
    case 'history':
      await sleep(4000)
      return success(await fetchQuery(history))
    default:
      return failure({
        status: 'error',
        message: 'Invalid query value',
      })
  }
}
