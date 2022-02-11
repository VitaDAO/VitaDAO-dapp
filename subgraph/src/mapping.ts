import { json, JSONValueKind, JSONValue, Bytes, ipfs, log, Address, BigDecimal } from '@graphprotocol/graph-ts'
import { convertTokenToDecimal, safeDiv, tokenAmountToDecimal } from './utils'
import { BI_18, FACTORY_ADDRESS, NA, ONE_BI, ZERO_BD } from './utils/constants'
import {
  ProposalCreated as ProposalCreatedEvent,
  ProposalStatusChanged as ProposalStatusChangedEvent,
  Voted as VotedEvent,
  // EmergencyNFTApproval as EmergencyNFTApprovalEvent,
  // EmergencyNFTApprovalFail as EmergencyNFTApprovalFailEvent,
  // EmergencyShutdown as EmergencyShutdownEvent,
  // NFTReceived as NFTReceivedEvent,
  // NFTTransferred as NFTTransferredEvent,
  // NativeTokenChanged as NativeTokenChangedEvent,
  // NativeTokenTransferred as NativeTokenTransferredEvent,
  // OwnershipTransferred as OwnershipTransferredEvent,
  // StakingAddressChanged as StakingAddressChangedEvent,
  // VotingDelayChanged as VotingDelayChangedEvent,
  // VotingDurationChanged as VotingDurationChangedEvent
} from "../generated/Raphael/Raphael"
import { Raphael } from "../generated/Raphael/Raphael"
import { ENSReverseRecords } from "../generated/Raphael/ENSReverseRecords"
import {
  Proposal,
  ProposalContent,
  ProposalProjectContent,
  Vote,
  Voter,
  ProposalStatusChanged,
  ProposalCreated,
  Voted,
  Pool,
  Token,
  Bundle,
  Factory
} from "../generated/schema"
import {
  Initialize,
  Swap as SwapEvent
} from '../generated/Factory/Pool'
import { findEthPerToken, getEthPriceInUSD, getTrackedAmountUSD, sqrtPriceX96ToTokenPrices } from './utils/pricing'

const VOTING_NOT_STARTED = 'VOTING_NOT_STARTED';
const VOTING = 'VOTING';
const VOTES_FINISHED = 'VOTES_FINISHED';
const RESOLVED = 'RESOLVED';
const CANCELLED = 'CANCELLED';
const QUORUM_FAILED = 'QUORUM_FAILED';

function processProposalDetailsField(proposal: Proposal, details: string): void {
  let dataBytes = Bytes.fromUTF8(details);
  let data = json.try_fromBytes(dataBytes as Bytes);

  let title: JSONValue | null = null;
  let author: JSONValue | null = null;
  let cid: JSONValue | null = null;

  if (data.isOk && data.value.kind === JSONValueKind.OBJECT) {
    let dataObj = data.value.toObject();
    title = dataObj.get('title');
    author = dataObj.get('author');
    cid = dataObj.get('cid');

    if (title) {
      proposal.title = title.toString();
    } else {
      proposal.title = NA;
      log.warning('cant read title for proposal {}', [
        proposal.id.toString()
      ]);
    }

    if (author) {
      proposal.author = author.toString();
    } else {
      proposal.author = NA;
      log.warning('cant read author for proposal {}', [
        proposal.id.toString()
      ]);
    }

    if (cid) {
      proposal.ipfsHash = cid.toString();
    } else {
      proposal.ipfsHash = NA;
      log.warning('cant read cid for proposal {}', [
        proposal.id.toString()
      ]);
    }
  }
}

function createProposalData(proposal: Proposal): Proposal {
  let proposalContent = new ProposalContent(proposal.id.toString());
  proposalContent.type = NA;
  proposalContent.title = NA;
  proposalContent.summary = NA;
  proposalContent.details = NA;
  proposalContent.link = NA;

  let ipfsData = ipfs.cat(proposal.ipfsHash.toString())
  if (ipfsData != null) {
    let jsonData = json.try_fromBytes(ipfsData as Bytes);

    if (jsonData.isOk && jsonData.value.kind === JSONValueKind.OBJECT) {
      let proposalContentDataObj = jsonData.value.toObject();
      let type: JSONValue | null = null;
      let title: JSONValue | null = null;
      let summary: JSONValue | null = null;
      let details: JSONValue | null = null;
      let link: JSONValue | null = null;
      let project: JSONValue | null = null;

      type = proposalContentDataObj.get('proposal_type');
      if (type) {
        proposalContent.type = type.toString();
      }

      title = proposalContentDataObj.get('title');
      if (title) {
        proposalContent.title = title.toString();
      }

      summary = proposalContentDataObj.get('summary');
      if (summary) {
        proposalContent.summary = summary.toString();
      }

      details = proposalContentDataObj.get('details');
      if (details) {
        proposalContent.details = details.toString();
      }

      link = proposalContentDataObj.get('link');
      if (link) {
        proposalContent.link = link.toString();
      }

      if (type.toString() == 'funding' || type.toString() == 'project') {
        project = proposalContentDataObj.get('project');
        if (project.isNull()) {
          log.warning('project data is null: {}', [
            proposal.id.toString()
          ]);
        } else {
          let proposalProjectContent = new ProposalProjectContent(proposal.id.toString());
          let projectData = project.toObject()

          let title: JSONValue | null = null;
          let fundingStage: JSONValue | null = null;
          let researchLead: JSONValue | null = null;
          let institution: JSONValue | null = null;
          let clinicalStage: JSONValue | null = null;
          let ipStatus: JSONValue | null = null;
          let budget: JSONValue | null = null;
          let budgetCurrency: JSONValue | null = null;
          let summary: JSONValue | null = null;
          let aimsAndHypothesis: JSONValue | null = null;

          title = projectData.get('title')
          if (title) {
            proposalProjectContent.title = title.toString()
          }

          fundingStage = projectData.get('funding_stage')
          if (fundingStage) {
            proposalProjectContent.fundingStage = fundingStage.toString()
          }

          researchLead = projectData.get('research_lead')
          if (researchLead) {
            proposalProjectContent.researchLead = researchLead.toString()
          }

          institution = projectData.get('institution')
          if (institution) {
            proposalProjectContent.institution = institution.toString()
          }

          clinicalStage = projectData.get('clinical_stage')
          if (clinicalStage) {
            proposalProjectContent.clinicalStage = clinicalStage.toString()
          }

          ipStatus = projectData.get('ip_status')
          if (ipStatus) {
            proposalProjectContent.ipStatus = ipStatus.toString()
          }

          budgetCurrency = projectData.get('budget_currency')
          if (budgetCurrency) {
            proposalProjectContent.budgetCurrency = budgetCurrency.toString()
          }

          aimsAndHypothesis = projectData.get('aims_and_hypothesis')
          if (aimsAndHypothesis) {
            proposalProjectContent.aimsAndHypothesis = aimsAndHypothesis.toString()
          }

          summary = projectData.get('summary')
          if (summary) {
            proposalProjectContent.summary = summary.toString()
          }

          budget = projectData.get('budget')
          if (budget) {
            proposalProjectContent.budget = budget.toBigInt()
          }

          proposalProjectContent.save()
          proposalContent.project = proposal.id.toString()
        }
      } else {
        log.info('Not getting project data because proposal is not funding/project {}', [
          proposal.id.toString()
        ]);
      }
    } else {
      log.warning('Error parsing IPFS JSON for proposal {}', [
        proposal.id.toString()
      ]);
    }
  } else {
    log.warning('Data from IPFS is null for proposal {}', [
      proposal.id.toString()
    ]);
  }

  proposalContent.save();
  return proposal;
}

export function handleProposalCreated(event: ProposalCreatedEvent): void {
  let proposal = new Proposal(event.params.proposalId.toString());
  proposal.voteStartBlock = event.params.vote_start;
  proposal.voteEndBlock = event.params.vote_end;
  proposal.status = VOTING_NOT_STARTED;
  proposal.votingPossible = false;
  proposal.hasPassed = false;
  proposal.createdAt = event.block.timestamp;
  proposal.numTokensYes = ZERO_BD;
  proposal.numTokensNo = ZERO_BD;
  proposal.totalVotes = ZERO_BD;

  let raphael = Raphael.bind(event.address)
  let callResult = raphael.try_getMinVotesNeeded()
  if (callResult.reverted) {
    log.info("getMinVotesNeeded reverted", [])
  } else {
    proposal.minVotesNeeded = tokenAmountToDecimal(callResult.value, BI_18)
  }

  processProposalDetailsField(proposal, event.params.details);

  createProposalData(proposal);

  proposal.proposalContent = event.params.proposalId.toString();
  proposal.save();

  let proposalCreatedEvent = new ProposalCreated(event.block.number.toString().concat('-').concat(event.logIndex.toString()))
  proposalCreatedEvent.type = "proposalCreated"
  proposalCreatedEvent.createdAt = event.block.timestamp
  proposalCreatedEvent.proposal = event.params.proposalId.toString()
  proposalCreatedEvent.save()
}

export function proposalPassed(proposal: Proposal): boolean {
  return (proposal.status === VOTES_FINISHED || proposal.status === RESOLVED) && proposal.numTokensYes > proposal.numTokensNo;
}

export function handleProposalStatusChanged(
  event: ProposalStatusChangedEvent
): void {
  let proposal = Proposal.load(event.params.proposalId.toString());

  let statusChangeEvent = new ProposalStatusChanged(event.block.number.toString().concat('-').concat(event.logIndex.toString()))
  statusChangeEvent.type = "proposalStatusChange"
  statusChangeEvent.createdAt = event.block.timestamp
  statusChangeEvent.proposal = proposal.id

  switch (event.params.newStatus) {
    case 0:
      proposal.status = VOTING_NOT_STARTED;
      statusChangeEvent.newStatus = VOTING_NOT_STARTED;
      proposal.votingPossible = false;
      break;
    case 1:
      proposal.status = VOTING;
      statusChangeEvent.newStatus = VOTING;
      proposal.votingPossible = true;
      break;
    case 2:
      proposal.status = VOTES_FINISHED;
      statusChangeEvent.newStatus = VOTES_FINISHED;
      proposal.votingPossible = false;
      break;
    case 3:
      proposal.status = RESOLVED;
      statusChangeEvent.newStatus = RESOLVED;
      proposal.votingPossible = false;
      break;
    case 4:
      proposal.status = CANCELLED;
      statusChangeEvent.newStatus = CANCELLED;
      proposal.votingPossible = false;
      break;
    case 5:
      proposal.status = QUORUM_FAILED;
      statusChangeEvent.newStatus = QUORUM_FAILED;
      proposal.votingPossible = false;
      break;
  }

  proposal.hasPassed = proposalPassed(proposal as Proposal);

  proposal.save();
  statusChangeEvent.save();
}

export function handleVoted(event: VotedEvent): void {
  let proposal = Proposal.load(event.params.proposalId.toString());
  let vote = new Vote(event.params.proposalId.toString() + "-" + event.params.voter.toHexString());
  vote.direction = event.params.direction;
  let numTokens = tokenAmountToDecimal(event.params.weight, BI_18);
  vote.weight = numTokens;
  vote.proposal = event.params.proposalId.toString();
  vote.voter = event.params.voter.toHexString();
  vote.createdAt = event.block.timestamp;
  vote.save();

  if (event.params.direction === true) {
    proposal.numTokensYes = proposal.numTokensYes.plus(numTokens);
  } else {
    proposal.numTokensNo = proposal.numTokensNo.plus(numTokens);
  }

  proposal.totalVotes = proposal.numTokensYes.plus(proposal.numTokensNo)

  proposal.save();

  let voter = Voter.load(event.params.voter.toHexString());
  if (!voter) {
    voter = new Voter(event.params.voter.toHexString());
    voter.save();
  }

  // This is the mainnet address of the ENS contract
  let ensReverseRecords = ENSReverseRecords.bind(Address.fromString("0x3671aE578E63FdF66ad4F3E12CC0c0d71Ac7510C"))
  let addresses = new Array<Address>(0)
  addresses.push(Address.fromString(voter.id))

  let callResult = ensReverseRecords.try_getNames(addresses)
  if (callResult.reverted) {
    log.warning("ENS getNames reverted", [])
  } else {
    let domain = callResult.value
    voter.ens = domain[0]
    voter.save();
    log.warning("got ENS for {}: {}",
      [
        voter.id,
        domain[0]
      ]
    )
  }

  let votedEvent = new Voted(event.block.number.toString().concat('-').concat(event.logIndex.toString()))
  votedEvent.type = "voted"
  votedEvent.createdAt = event.block.timestamp
  votedEvent.vote = vote.id
  votedEvent.save()
}

// export function handleNativeTokenChanged(event: NativeTokenChangedEvent): void {
//   let entity = new NativeTokenChanged(
//     event.transaction.hash.toHex() + "-" + event.logIndex.toString()
//   )
//   entity.newAddress = event.params.newAddress
//   entity.oldAddress = event.params.oldAddress
//   entity.changedBy = event.params.changedBy
//   entity.save()
// }

// export function handleNativeTokenTransferred(
//   event: NativeTokenTransferredEvent
// ): void {
//   let entity = new NativeTokenTransferred(
//     event.transaction.hash.toHex() + "-" + event.logIndex.toString()
//   )
//   entity.authorizedBy = event.params.authorizedBy
//   entity.to = event.params.to
//   entity.amount = event.params.amount
//   entity.save()
// }

// export function handleOwnershipTransferred(
//   event: OwnershipTransferredEvent
// ): void {
//   let entity = new OwnershipTransferred(
//     event.transaction.hash.toHex() + "-" + event.logIndex.toString()
//   )
//   entity.previousOwner = event.params.previousOwner
//   entity.newOwner = event.params.newOwner
//   entity.save()
// }

// export function handleStakingAddressChanged(
//   event: StakingAddressChangedEvent
// ): void {
//   let entity = new StakingAddressChanged(
//     event.transaction.hash.toHex() + "-" + event.logIndex.toString()
//   )
//   entity.newAddress = event.params.newAddress
//   entity.oldAddress = event.params.oldAddress
//   entity.changedBy = event.params.changedBy
//   entity.save()
// }

// export function handleVotingDelayChanged(event: VotingDelayChangedEvent): void {
//   let entity = new VotingDelayChanged(
//     event.transaction.hash.toHex() + "-" + event.logIndex.toString()
//   )
//   entity.newDuration = event.params.newDuration
//   entity.save()
// }

// export function handleVotingDurationChanged(
//   event: VotingDurationChangedEvent
// ): void {
//   let entity = new VotingDurationChanged(
//     event.transaction.hash.toHex() + "-" + event.logIndex.toString()
//   )
//   entity.newDuration = event.params.newDuration
//   entity.save()
// }

export function handleInitialize(event: Initialize): void {
  let pool = Pool.load(event.address.toHexString())
  pool.sqrtPrice = event.params.sqrtPriceX96
  // pool.tick = BigInt.fromI32(event.params.tick)
  // update token prices
  let token0 = Token.load(pool.token0)
  let token1 = Token.load(pool.token1)

  // update ETH price now that prices could have changed
  let bundle = Bundle.load('1')
  bundle.ethPriceUSD = getEthPriceInUSD()
  bundle.save()

  // update token prices
  token0.derivedETH = findEthPerToken(token0 as Token)
  token1.derivedETH = findEthPerToken(token1 as Token)
  token0.save()
  token1.save()
}

export function handleSwap(event: SwapEvent): void {
  let bundle = Bundle.load('1')
  let factory = Factory.load(FACTORY_ADDRESS)
  let pool = Pool.load(event.address.toHexString())

  // hot fix for bad pricing
  if (pool.id == '0x9663f2ca0454accad3e094448ea6f77443880454') {
    return
  }

  let token0 = Token.load(pool.token0)
  let token1 = Token.load(pool.token1)

  // amounts - 0/1 are token deltas: can be positive or negative
  let amount0 = convertTokenToDecimal(event.params.amount0, token0.decimals)
  let amount1 = convertTokenToDecimal(event.params.amount1, token1.decimals)

  // need absolute amounts for volume
  let amount0Abs = amount0
  if (amount0.lt(ZERO_BD)) {
    amount0Abs = amount0.times(BigDecimal.fromString('-1'))
  }
  let amount1Abs = amount1
  if (amount1.lt(ZERO_BD)) {
    amount1Abs = amount1.times(BigDecimal.fromString('-1'))
  }

  let amount0ETH = amount0Abs.times(token0.derivedETH)
  let amount1ETH = amount1Abs.times(token1.derivedETH)
  let amount0USD = amount0ETH.times(bundle.ethPriceUSD)
  let amount1USD = amount1ETH.times(bundle.ethPriceUSD)

  // get amount that should be tracked only - div 2 because cant count both input and output as volume
  let amountTotalUSDTracked = getTrackedAmountUSD(amount0Abs, token0 as Token, amount1Abs, token1 as Token).div(
    BigDecimal.fromString('2')
  )
  let amountTotalETHTracked = safeDiv(amountTotalUSDTracked, bundle.ethPriceUSD)
  let amountTotalUSDUntracked = amount0USD.plus(amount1USD).div(BigDecimal.fromString('2'))

  let feesETH = amountTotalETHTracked.times(pool.feeTier.toBigDecimal()).div(BigDecimal.fromString('1000000'))
  let feesUSD = amountTotalUSDTracked.times(pool.feeTier.toBigDecimal()).div(BigDecimal.fromString('1000000'))

  // global updates
  factory.txCount = factory.txCount.plus(ONE_BI)
  factory.totalVolumeETH = factory.totalVolumeETH.plus(amountTotalETHTracked)
  factory.totalVolumeUSD = factory.totalVolumeUSD.plus(amountTotalUSDTracked)
  factory.untrackedVolumeUSD = factory.untrackedVolumeUSD.plus(amountTotalUSDUntracked)
  factory.totalFeesETH = factory.totalFeesETH.plus(feesETH)
  factory.totalFeesUSD = factory.totalFeesUSD.plus(feesUSD)

  // reset aggregate tvl before individual pool tvl updates
  let currentPoolTvlETH = pool.totalValueLockedETH
  factory.totalValueLockedETH = factory.totalValueLockedETH.minus(currentPoolTvlETH)

  // pool volume
  pool.volumeToken0 = pool.volumeToken0.plus(amount0Abs)
  pool.volumeToken1 = pool.volumeToken1.plus(amount1Abs)
  pool.volumeUSD = pool.volumeUSD.plus(amountTotalUSDTracked)
  pool.untrackedVolumeUSD = pool.untrackedVolumeUSD.plus(amountTotalUSDUntracked)
  pool.feesUSD = pool.feesUSD.plus(feesUSD)
  pool.txCount = pool.txCount.plus(ONE_BI)

  // Update the pool with the new active liquidity, price, and tick.
  pool.liquidity = event.params.liquidity
  // pool.tick = BigInt.fromI32(event.params.tick as i32)
  pool.sqrtPrice = event.params.sqrtPriceX96
  pool.totalValueLockedToken0 = pool.totalValueLockedToken0.plus(amount0)
  pool.totalValueLockedToken1 = pool.totalValueLockedToken1.plus(amount1)

  // update token0 data
  token0.volume = token0.volume.plus(amount0Abs)
  token0.totalValueLocked = token0.totalValueLocked.plus(amount0)
  token0.volumeUSD = token0.volumeUSD.plus(amountTotalUSDTracked)
  token0.untrackedVolumeUSD = token0.untrackedVolumeUSD.plus(amountTotalUSDUntracked)
  token0.feesUSD = token0.feesUSD.plus(feesUSD)
  token0.txCount = token0.txCount.plus(ONE_BI)

  // update token1 data
  token1.volume = token1.volume.plus(amount1Abs)
  token1.totalValueLocked = token1.totalValueLocked.plus(amount1)
  token1.volumeUSD = token1.volumeUSD.plus(amountTotalUSDTracked)
  token1.untrackedVolumeUSD = token1.untrackedVolumeUSD.plus(amountTotalUSDUntracked)
  token1.feesUSD = token1.feesUSD.plus(feesUSD)
  token1.txCount = token1.txCount.plus(ONE_BI)

  // updated pool ratess
  let prices = sqrtPriceX96ToTokenPrices(pool.sqrtPrice, token0 as Token, token1 as Token)
  pool.token0Price = prices[0]
  pool.token1Price = prices[1]
  pool.save()

  // update USD pricing
  bundle.ethPriceUSD = getEthPriceInUSD()
  bundle.save()
  token0.derivedETH = findEthPerToken(token0 as Token)
  token1.derivedETH = findEthPerToken(token1 as Token)

  /**
   * Things afffected by new USD rates
   */
  pool.totalValueLockedETH = pool.totalValueLockedToken0
    .times(token0.derivedETH)
    .plus(pool.totalValueLockedToken1.times(token1.derivedETH))
  pool.totalValueLockedUSD = pool.totalValueLockedETH.times(bundle.ethPriceUSD)

  factory.totalValueLockedETH = factory.totalValueLockedETH.plus(pool.totalValueLockedETH)
  factory.totalValueLockedUSD = factory.totalValueLockedETH.times(bundle.ethPriceUSD)

  token0.totalValueLockedUSD = token0.totalValueLocked.times(token0.derivedETH).times(bundle.ethPriceUSD)
  token1.totalValueLockedUSD = token1.totalValueLocked.times(token1.derivedETH).times(bundle.ethPriceUSD)

  factory.save()
  pool.save()
  token0.save()
  token1.save()
}