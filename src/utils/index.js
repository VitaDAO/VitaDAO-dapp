import { ethers } from 'ethers'

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value) {
  try {
    return ethers.utils.getAddress(value)
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
