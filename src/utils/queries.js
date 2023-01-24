import { useQuery } from '@tanstack/vue-query'
import { computed, unref } from 'vue'

function format(n, decimals = 2) {
  return n?.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

const API_URL = 'https://vitadao-dapp-api-worker.raulrpearson.workers.dev'

export function useDaoStats() {
  return useQuery({
    queryKey: ['useDaoStats'],
    queryFn: () =>
      fetch(API_URL + '/vita')
        .then((res) => res.json())
        .then((json) => {
          if (json.status === 'success') {
            const { circulating, market_cap, price } = json.results[0]
            return {
              vita: {
                circulating: format(circulating, 0),
                marketCap: format(market_cap, 0),
                price: format(price, 2),
              },
              totalInvestment: format(3.5, 1) + 'M+',
            }
          } else if (json.status === 'error') {
            throw new Error(json.message)
          }
          throw new Error('Unexpected response shape: ' + JSON.stringify(json))
        }),
  })
}

export function useTreasuryTokens(address) {
  return useQuery({
    queryKey: ['useTreasuryTokens', unref(address)],
    queryFn: () =>
      fetch(API_URL + `/tokens?address=${unref(address)}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.status === 'success') {
            const tokens = json.results
            return tokens.map((token) => ({
              name: token.name,
              percent: token.usd_percent ? `${format(token.usd_percent)}%` : '',
              value: token.usd_value ? `$${format(token.usd_value, 0)}` : '',
              treasury: token.price
                ? `${format(token.balance, 0)} ${token.symbol} · $${format(token.price)}`
                : `${format(token.balance, 0)} ${token.symbol}`,
              // stats: 'wip',
              src: token.image_url,
              address: token.contract_address,
            }))
          } else if (json.status === 'error') {
            throw new Error(json.message)
          }
          throw new Error('Unexpected response shape: ' + JSON.stringify(json))
        }),
  })
}

export function useUsdTimeseries(interval) {
  const queryReturn = useQuery({
    queryKey: ['useUsdTimeseries', unref(interval)],
    queryFn: () =>
      fetch(API_URL + `/history?interval=${unref(interval)}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.status === 'success') {
            return json.results
          } else if (json.status === 'error') {
            throw new Error(json.message)
          }
          throw new Error('Unexpected response shape: ' + JSON.stringify(json))
        }),
  })

  const usdTotal = computed(() =>
    Array.isArray(queryReturn.data.value)
      ? queryReturn.data.value.at(-1).balance?.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
      : undefined,
  )

  const usdDelta = computed(() => {
    if (Array.isArray(queryReturn.data.value)) {
      const start = queryReturn.data.value.at(0).balance
      const end = queryReturn.data.value.at(-1).balance
      const delta = end - start
      const deltaPercent = (delta / start) * 100
      const sign = delta > 0 ? '+' : ''
      return `${sign}${Number(deltaPercent.toPrecision(2))}% ($${Math.abs(delta).toLocaleString(
        undefined,
        {
          maximumFractionDigits: 0,
        },
      )})`
    }
    return undefined
  })

  return {
    ...queryReturn,
    usdTotal,
    usdDelta,
  }
}

export function useNfts({ owner, contract = 'all' }) {
  return useQuery({
    queryKey: ['useNfts', unref(owner), unref(contract)],
    queryFn: () =>
      fetch(API_URL + `/nfts?owner=${unref(owner)}&contract=${unref(contract)}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.status === 'success') {
            return json.results
          } else if (json.status === 'error') {
            throw new Error(json.message)
          }
          throw new Error('Unexpected response shape: ' + JSON.stringify(json))
        }),
  })
}
