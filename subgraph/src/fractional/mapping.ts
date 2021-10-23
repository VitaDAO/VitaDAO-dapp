import { json, JSONValueKind, JSONValue, Bytes, ipfs, log } from '@graphprotocol/graph-ts'
import { tokenAmountToDecimal } from '../utils'
import { BI_18, NA, ZERO_BD, NFT_CONTRACT_ADDRESS } from '../utils/constants'
import {
  Mint as MintEvent
} from "../../generated/Fractional/Fractional"
// import { Fractional } from "../../generated/Fractional/Fractional"
import {
  FractionalVault,
} from "../../generated/schema"

export function handleMint(event: MintEvent): void {
  let tokenAddress = event.params.token.toHexString()
  // We're only interested in Fractional vaults that get created from our own NFTs
  if(tokenAddress == NFT_CONTRACT_ADDRESS) {
    let vault = new FractionalVault(event.params.vault.toHexString())
    vault.nft = event.params.id.toString()
    vault.nftContract = event.params.token.toHexString()
    vault.vaultId = event.params.vaultId.toString()
    let reservePrice = tokenAmountToDecimal(event.params.price, BI_18);
    vault.price = reservePrice;

    vault.save();
  }
}

