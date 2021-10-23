/* eslint-disable prefer-const */
import { BigInt, BigDecimal } from '@graphprotocol/graph-ts'

export let ZERO_BI = BigInt.fromI32(0)
export let ONE_BI = BigInt.fromI32(1)
export let ZERO_BD = BigDecimal.fromString('0')
export let ONE_BD = BigDecimal.fromString('1')
export let BI_18 = BigInt.fromI32(18)

export let NA = 'N/A';

// This is the address of the ERC721 IP NFT contract we're using for our demo
export let NFT_CONTRACT_ADDRESS = '0x93f1554c9ac9b7ca1a0cd3d8263b152ed710d0f9'