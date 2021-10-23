// import { json, JSONValueKind, JSONValue, Bytes, ipfs, log } from '@graphprotocol/graph-ts'
// import { tokenAmountToDecimal } from './utils'
// import { BI_18, NA, ZERO_BD } from './utils/constants'
import {
  Transfer as TransferEvent
} from "../../generated/NFT/NFT"
import { NFT as TokenContract } from "../../generated/NFT/NFT"
import {
  IPNFT,
  Account
} from "../../generated/schema"

export function handleTransfer(event: TransferEvent): void {
  let token = IPNFT.load(event.params.tokenId.toString());

  let recipient = Account.load(event.params.to.toHexString())

  if(!recipient) {
    recipient = new Account(event.params.to.toHexString())
    recipient.save()
  }

  if(token) {
    token.owner = event.params.to.toHexString();
    token.save();
  } else {
    let tokenContract = TokenContract.bind(event.address);

    token = new IPNFT(event.params.tokenId.toString())
    token.owner = event.params.to.toHexString();
    token.tokenURI = tokenContract.tokenURI(event.params.tokenId);

    token.save();
  }
}

