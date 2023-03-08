import { useQuery } from '@tanstack/vue-query'
import { unref } from 'vue'

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
      fetch(process.env.VUE_APP_API_URL + '/v1/token/vita')
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

export function useContentType(url) {
  return useQuery({
    queryKey: ['useContentType', unref(url)],
    queryFn: () => fetch(url, { method: 'HEAD' }).then((res) => res.headers.get('content-type')),
  })
}

export function useTreasury() {
  return useQuery({
    queryKey: ['useTreasury'],
    queryFn: () =>
      fetch(process.env.VUE_APP_API_URL + '/v1/treasury/vitadao').then((response) => {
        if (response.status !== 200) {
          throw new Error('Error while fetching treasury.')
        }
        return response.json()
      }),
  })
}
