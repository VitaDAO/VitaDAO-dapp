import { json, JSONValueKind, JSONValue, Bytes, ipfs, log } from '@graphprotocol/graph-ts'
import { tokenAmountToDecimal } from './utils'
import { BI_18, NA, ZERO_BD } from './utils/constants'
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
import { Raphael } from "../generated/Raphael/Raphael"
import {
  Proposal,
  ProposalContent,
  ProposalProjectContent,
  Vote,
  Voter
} from "../generated/schema"

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

    if(title) {
      proposal.title = title.toString();
    } else {
      proposal.title = NA;
      log.warning('cant read title for proposal {}', [
        proposal.id.toString()
      ]);
    }

    if(author) {
      proposal.author = author.toString();
    } else {
      proposal.author = NA;
      log.warning('cant read author for proposal {}', [
        proposal.id.toString()
      ]);
    }

    if(cid) {
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
      if(type) {
        proposalContent.type = type.toString();
      }

      title = proposalContentDataObj.get('title');
      if(title) {
        proposalContent.title = title.toString();
      }

      summary = proposalContentDataObj.get('summary');
      if(summary) {
        proposalContent.summary = summary.toString();
      }

      details = proposalContentDataObj.get('details');
      if(details) {
        proposalContent.details = details.toString();
      }

      link = proposalContentDataObj.get('link');
      if(link) {
        proposalContent.link = link.toString();
      }

      if(type.toString() == 'funding' || type.toString() == 'project') {
        project = proposalContentDataObj.get('project');
        if(project.isNull()) {
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
          if(title) {
            proposalProjectContent.title = title.toString()
          }

          fundingStage = projectData.get('funding_stage')
          if(fundingStage) {
            proposalProjectContent.fundingStage = fundingStage.toString()
          }

          researchLead = projectData.get('research_lead')
          if(researchLead) {
            proposalProjectContent.researchLead = researchLead.toString()
          }

          institution = projectData.get('institution')
          if(institution) {
            proposalProjectContent.institution = institution.toString()
          }

          clinicalStage = projectData.get('clinical_stage')
          if(clinicalStage) {
            proposalProjectContent.clinicalStage = clinicalStage.toString()
          }

          ipStatus = projectData.get('ip_status')
          if(ipStatus) {
            proposalProjectContent.ipStatus = ipStatus.toString()
          }

          budgetCurrency = projectData.get('budget_currency')
          if(budgetCurrency) {
            proposalProjectContent.budgetCurrency = budgetCurrency.toString()
          }

          aimsAndHypothesis = projectData.get('aims_and_hypothesis')
          if(aimsAndHypothesis) {
            proposalProjectContent.aimsAndHypothesis = aimsAndHypothesis.toString()
          }

          summary = projectData.get('summary')
          if(summary) {
            proposalProjectContent.summary = summary.toString()
          }

          budget = projectData.get('budget')
          if(budget) {
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
}

export function proposalPassed(proposal: Proposal) : boolean {
  return (proposal.status === VOTES_FINISHED || proposal.status === RESOLVED) && proposal.numTokensYes > proposal.numTokensNo;
}

export function handleProposalStatusChanged(
  event: ProposalStatusChangedEvent
): void {
  let proposal = Proposal.load(event.params.proposalId.toString());

  switch (event.params.newStatus) {
    case 0:
      proposal.status = VOTING_NOT_STARTED;
      proposal.votingPossible = false;
      break;
    case 1:
      proposal.status = VOTING;
      proposal.votingPossible = true;
      break;
    case 2:
      proposal.status = VOTES_FINISHED;
      proposal.votingPossible = false;
      break;
    case 3:
      proposal.status = RESOLVED;
      proposal.votingPossible = false;
      break;
    case 4:
      proposal.status = CANCELLED;
      proposal.votingPossible = false;
      break;
    case 5:
      proposal.status = QUORUM_FAILED;
      proposal.votingPossible = false;
      break;
  }

  proposal.hasPassed = proposalPassed(proposal as Proposal);

  proposal.save();
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

  if(event.params.direction === true) {
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
