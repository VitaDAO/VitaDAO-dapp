// TODO replace stubs with the real thing

const stats = {
  treasury: { totalUsdValue: '25,016,640', weeklyUsdChange: '+14% ($3,079,104)' },
  vita: { circulating: '19,483,234', marketCap: '25,000,000' },
  totalInvestment: '350,000',
}

const tokens = [
  {
    name: 'VitaDAO Token',
    percent: '52.88%',
    value: '$13,524,470',
    treasury: '7,757,325.735 VITA • $2.00',
    stats: '+4.32% ($559,782.25)',
  },
  {
    name: 'Wrapped Ether',
    percent: '34.94%',
    value: '$8,945,746',
    treasury: '1,900.756 WETH • $4,701.98',
    stats: '-1.05% ($95,102.25)',
  },
  {
    name: 'Balancer 50 VITA 50 WETH',
    percent: '52.88%',
    value: '$13,524,470',
    treasury: '7,757,325.735 B50VITA-50WETH • $98.36',
    stats: '+4.32% ($559,782.25)',
  },
  {
    name: 'VitaDAO Balancer Pool',
    percent: '52.88%',
    value: '$13,524,470',
    treasury: '7,757,325.735 VITA • $2.00',
    stats: '+4.32% ($559,782.25)',
  },
  {
    name: 'USD Coin',
    percent: '52.88%',
    value: '$13,524,470',
    treasury: '7,757,325.735 VITA • $2.00',
    stats: '+4.32% ($559,782.25)',
  },
]

// Adding jitter and delay to make it more realistic
const promisify = (
  value,
  {
    delay = 3000,
    error = new Error('An error ocurred when fetching data.'),
    maxJitter = 1000,
    shouldThrow = false,
  } = {},
) => {
  if (shouldThrow) throw error
  const jitter = maxJitter * Math.random()
  return new Promise((resolve) => setTimeout(() => resolve(value), delay + jitter))
}

export async function getDaoStats() {
  return promisify(stats)
}

export async function getTreasuryTokens() {
  return promisify(tokens)
}

function* getNextUsdValue({ maxDelta = 100000, initialValue = 24000000 } = {}) {
  let x = initialValue
  while (true) {
    yield x
    x = x + Math.random() * maxDelta - maxDelta / 2
  }
}

export async function getTreasuryUsdTimeseries({ queryKey: [period] }) {
  console.log(period)
  // No need to use period in stub, as we'll always be returning an array of numbers
  const generator = getNextUsdValue()
  return promisify(new Array(200).fill(null).map(() => generator.next().value))
}
