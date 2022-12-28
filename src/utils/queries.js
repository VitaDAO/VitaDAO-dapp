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

export async function getTreasuryUsdTimeseries({ queryKey: [period] }) {
  return fetch('.netlify/functions/transpose?query=history').then((res) => res.json())
}
