import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'

function format(n, decimals = 2) {
  return n?.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export async function getDaoStats() {
  return fetch('.netlify/functions/transpose?query=stats')
    .then((res) => res.json())
    .then((json) => ({
      ...json,
      vita: {
        circulating: format(json.vita.circulating, 0),
        marketCap: format(json.vita.market_cap, 0),
      },
    }))
}

export async function getTreasuryTokens() {
  return fetch('.netlify/functions/transpose?query=tokens')
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
    )
}

export function useUsdTimeseries(interval) {
  const queryReturn = useQuery({
    queryKey: ['getTreasuryUsdTimeseries', interval],
    queryFn: () => getTreasuryUsdTimeseries(interval.value),
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

async function getTreasuryUsdTimeseries(interval) {
  return fetch(`.netlify/functions/transpose?query=history&interval=${interval}`).then((res) =>
    res.json(),
  )
}
