import { formatNumber } from '@/utils'
import { useQuery } from '@tanstack/vue-query'

export function useDaoStats() {
  return useQuery({
    queryKey: ['useDaoStats'],
    queryFn: () =>
      fetch(process.env.VUE_APP_TREASURY_API_URL + '/v1/token/vita')
        .then((res) => res.json())
        .then((json) => {
          if (json.status === 'success') {
            const { circulating, market_cap, price } = json.results[0]
            return {
              vita: {
                circulating: formatNumber(circulating, { decimals: 0 }),
                marketCap: formatNumber(market_cap, { decimals: 0 }),
                price: formatNumber(price, { decimals: 2 }),
              },
              totalInvestment: formatNumber(4, { decimals: 0 }) + 'M+',
            }
          } else if (json.status === 'error') {
            throw new Error(json.message)
          }
          throw new Error('Unexpected response shape: ' + JSON.stringify(json))
        }),
  })
}

export function useTreasury() {
  return useQuery({
    queryKey: ['useTreasury'],
    queryFn: () =>
      fetch(process.env.VUE_APP_TREASURY_API_URL + '/v1/treasury/vitadao').then((response) => {
        if (response.status !== 200) {
          throw new Error('Error while fetching treasury.')
        }
        return response.json()
      }),
  })
}
