// import { json, JSONValueKind, JSONValue, Bytes, ipfs, log } from '@graphprotocol/graph-ts'
// import { tokenAmountToDecimal } from './utils'
// import { BI_18, NA, ZERO_BD } from './utils/constants'
import {
  Transfer as TransferEvent
} from "../../generated/NFT/NFT"
import {
  IPNFT,
} from "../../generated/schema"

export function handleTransfer(event: TransferEvent): void {
  let token = new IPNFT(event.params.tokenId.toString())
  token.save();
}

