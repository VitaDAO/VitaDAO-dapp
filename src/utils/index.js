import { getAddress } from '@ethersproject/address'

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value) {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address, chars = 4) {
  const parsed = isAddress(address)
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

export function blockDistanceInSeconds(currentBlock, block) {
  return (
    (parseInt(currentBlock) - parseInt(block)) * parseFloat(process.env.VUE_APP_AVERAGE_BLOCK_TIME)
  )
}

export function metamaskAvailable() {
  return typeof window.ethereum != 'undefined' && window.ethereum.isMetaMask === true
}

export function injectedWalletAvailable() {
  return typeof window.ethereum != 'undefined'
}

export function capitalize(word) {
  return word
    .split('')
    .map((letter, index) => (index ? letter.toLowerCase() : letter.toUpperCase()))
    .join('')
}

export function formatNumber(n, { decimals, cutoff = 1000 } = {}) {
  if (decimals || decimals == 0) {
    return n?.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  }

  if (n >= cutoff) {
    return n.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  } else {
    return n?.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }
}
