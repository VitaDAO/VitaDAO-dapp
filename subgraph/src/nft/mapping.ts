import { json, JSONValueKind, JSONValue, Bytes, ipfs, log } from '@graphprotocol/graph-ts'
// import { tokenAmountToDecimal } from './utils'
import { BI_18, NA, ZERO_BD } from '../utils/constants'
import {
  Transfer as TransferEvent,
  TokenURLUpdated as TokenURLUpdatedEvent
} from "../../generated/NFT/NFT"
import { NFT as TokenContract } from "../../generated/NFT/NFT"
import {
  IPNFT,
  Account
} from "../../generated/schema"

function getMetaDataFromIPFS(token: IPNFT | null): void {
  let ipfsURI = token.tokenURI
  // We have to check for this default token URI and replace it, because TheGraph doesn't support ARWeave yet
  if(ipfsURI == "https://arweave.net/eUDLZaySoywhvtVySxbRdLiarmXsW2Zu5nQxMksVcyM") {
    ipfsURI = "ipfs://QmRzMJ6ft2hMn4HpMzvKo1z1aQFXYzKMEnzRk9m6PQoV82"
    log.warning("Replacing default ARWeave Token URI for token {}", [
      token.id.toString()
    ]);
  }

  let ipfsHash = ipfsURI.split("ipfs://")[1]
  let ipfsData = ipfs.cat(ipfsHash)
  if (ipfsData != null) {
    let jsonData = json.try_fromBytes(ipfsData as Bytes);

    if (jsonData.isOk && jsonData.value.kind === JSONValueKind.OBJECT) {
      let metaDataDataObj = jsonData.value.toObject();
      let name: JSONValue | null = null;
      let description: JSONValue | null = null;
      let externalUrl: JSONValue | null = null;
      let image: JSONValue | null = null;
      let properties: JSONValue | null = null;

      name = metaDataDataObj.get('name');
      if(name) {
        token.name = name.toString();
      } else {
        token.name = NA;
      }

      description = metaDataDataObj.get('description');
      if(description) {
        token.description = description.toString();
      } else {
        token.description = NA;
      }

      image = metaDataDataObj.get('image');
      if(image) {
        token.image = image.toString();
      } else {
        token.image = NA;
      }

      externalUrl = metaDataDataObj.get('external_url');
      if(externalUrl) {
        token.externalUrl = externalUrl.toString();
      } else {
        token.externalUrl = NA;
      }

      properties = metaDataDataObj.get('properties');
      if(properties.isNull()) {
        log.warning('nft properties are null: {}', [
          token.id.toString()
        ]);
      } else {
        let propertiesData = properties.toObject()

        let nvmMetadata: JSONValue | null = propertiesData.get('nvm_metadata')
        if(nvmMetadata) {
          token.nvmMetadata = nvmMetadata.toString()
        }

        let agreementType: JSONValue | null = propertiesData.get('agreement_type')
        if(agreementType) {
          token.agreementType = agreementType.toString()
        }

        let industry: JSONValue | null = propertiesData.get('industry')
        if(industry) {
          token.industry = industry.toString()
        }

        let researchLead: JSONValue | null = propertiesData.get('research_lead')
        if(researchLead) {
          token.researchLead = researchLead.toString()
        }

        let timeline: JSONValue | null = propertiesData.get('timeline')
        if(timeline) {
          token.timeline = timeline.toString()
        }

        let duration: JSONValue | null = propertiesData.get('duration')
        if(duration) {
          token.duration = duration.toString()
        }

        let requiredFunding: JSONValue | null = propertiesData.get('required_funding')
        if(requiredFunding) {
          token.requiredFunding = requiredFunding.toString()
        }

        let evaluationWriteup: JSONValue | null = propertiesData.get('evaluation_writeup')
        if(evaluationWriteup) {
          token.evaluationWriteup = evaluationWriteup.toString()
        }

        let area: JSONValue | null = propertiesData.get('area')
        if(area) {
          token.area = area.toString()
        }

        let stage: JSONValue | null = propertiesData.get('stage')
        if(stage) {
          token.stage = stage.toString()
        }

        let status: JSONValue | null = propertiesData.get('status')
        if(status) {
          token.status = status.toString()
        }

        let investment: JSONValue | null = propertiesData.get('investment')
        if(investment) {
          // Workaround because of type error with this field
          if(investment.kind == JSONValueKind.STRING) {
            token.investment = investment.toString()
          } else {
            token.investment = "350000"
          }
        }

        let initiated: JSONValue | null = propertiesData.get('initiated')
        if(initiated) {
          token.initiated = initiated.toString()
        }

        let patent: JSONValue | null = propertiesData.get('patent')
        if(patent) {
          token.patent = patent.toString()
        }
      }
    }
  } else {
    log.warning("Couldn't get IPFS data for token {}", [
      token.id.toString()
    ]);
  }
  token.save()
}

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
    token.tokenContract = event.address.toHexString();

    getMetaDataFromIPFS(token);

    token.save();
  }
}

export function handleTokenURLUpdated(event: TokenURLUpdatedEvent): void {
  let newURL = event.params.url

  log.warning("handle token update for token {}", [
    event.params.tokenId.toString()
  ]);

  // Workaround if the new URL is not in the ipfs:// format
  if (newURL.startsWith("https://vitadao.mypinata.cloud/ipfs/")){
    newURL = "ipfs://" + newURL.split("https://vitadao.mypinata.cloud/ipfs/")[1]
    log.warning("correcting tokenURL for token {} to {}", [
      event.params.tokenId.toString(),
      newURL
    ]);
  }

  let token = IPNFT.load(event.params.tokenId.toString());
  token.tokenURI = newURL
  token.save()
  getMetaDataFromIPFS(token);
}

