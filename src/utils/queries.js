import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'

function format(n, decimals = 2) {
  return n?.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export function useDaoStats() {
  return useQuery({
    queryKey: ['useDaoStats'],
    queryFn: () =>
      fetch('https://vitadao-dapp-api-worker.raulrpearson.workers.dev/vita')
        .then((res) => res.json())
        .then((json) => {
          if (json.status === 'success') {
            const { circulating, market_cap } = json.results[0]
            return {
              vita: {
                circulating: format(circulating, 0),
                marketCap: format(market_cap, 0),
              },
              totalInvestment: '424,242',
            }
          } else if (json.status === 'error') {
            throw new Error(json.message)
          }
          throw new Error('Unexpected response shape: ' + JSON.stringify(json))
        }),
  })
}

export function useTreasuryTokens() {
  return useQuery({
    queryKey: ['useTreasuryTokens'],
    queryFn: () =>
      fetch('https://vitadao-dapp-api-worker.raulrpearson.workers.dev/tokens')
        .then((res) => res.json())
        .then((json) =>
          json.map((token) => ({
            name: token.name,
            percent: token.usd_percent ? `${format(token.usd_percent)}%` : '',
            value: token.usd_value ? `$${format(token.usd_value, 0)}` : '',
            treasury: token.price
              ? `${format(token.balance, 0)} ${token.symbol} · $${format(token.price)}`
              : `${format(token.balance, 0)} ${token.symbol}`,
            // stats: 'wip',
            src: token.image_url,
            address: token.contract_address,
          })),
        ),
  })
}

export function useUsdTimeseries(interval) {
  const queryReturn = useQuery({
    queryKey: ['useUsdTimeseries', interval],
    queryFn: () =>
      fetch(
        `https://vitadao-dapp-api-worker.raulrpearson.workers.dev/history?interval=${interval.value}`,
      ).then((res) => res.json()),
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
