// import { json, JSONValueKind, JSONValue, Bytes, ipfs, log } from '@graphprotocol/graph-ts'
// import { tokenAmountToDecimal } from './utils'
// import { BI_18, NA, ZERO_BD } from './utils/constants'
import {
  Mint as MintEvent
} from "../../generated/Fractional/Fractional"
// import { Fractional } from "../../generated/Fractional/Fractional"
import {
  FractionalVault,
} from "../../generated/schema"

export function handleMint(event: MintEvent): void {
  let vault = new FractionalVault(event.params.vault.toHexString())
  vault.save();
}

