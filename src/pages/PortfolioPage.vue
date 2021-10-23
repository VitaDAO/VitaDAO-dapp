<template>
  <div class="w-full">
    <h2 class="font-bold mb-2 text-white text-xl">Fractionalized</h2>
    <transition name="fade" mode="out-in">
      <loading-indicator v-if="loading">Loading proposals…</loading-indicator>
      <div v-else-if="error">Error: {{ error.message }}</div>
      <portfolio-list v-else-if="result && result.ipnfts" :ipnfts="result.ipnfts" />
    </transition>
    <h2 class="font-bold mb-2 mt-4 text-white text-xl">100% Owned By DAO</h2>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import gql from 'graphql-tag'
import PortfolioList from '@/components/PortfolioList'
import LoadingIndicator from '@/components/LoadingIndicator'

export const proposalFragment = gql`
  fragment ProposalDetails on Proposal {
    id
    title
    status
    votingPossible
    hasPassed
    numTokensNo
    numTokensYes
    totalVotes
    voteStartBlock
    voteEndBlock
    minVotesNeeded
    proposalContent {
      title
      type
    }
  }
`

export default defineComponent({
  components: { PortfolioList, LoadingIndicator },
  setup() {
    const loading = false
    const error = null
    const result = {
      ipnfts: [
        {
          id: 1,
          name: 'The Longevity Molecule (IPNFT)',
          description:
            'The Scheibye-Knudsen lab has analyzed 1.5 billion prescriptions from 4.8 million individuals over 40 years in The Danish National Health Service Prescription Database and correlated this with the survival of individuals prescribed certain drugs. The Scheibye-Knudsen Lab has identified several FDA-approved medications that appear to have a strong effect on lifespan following analysis. This project focuses on testing and developing three of these small molecules as possible interventions in aging, with the first series of experiments testing these therapies in fruit flies and human cells. This is an exclusive license agreement for the IP resulting from these experiments.',
          external_url: 'https://dao.vitadao.com/#/proposals/funding/3',
          image: 'https://arweave.net/gQm_NpkJIjEFD6sOVHLEJ-tZIKhRvgmYEl5es0g-YdQ',
          properties: {
            nvm_metadata: 'https://arweave.net:443/qGsHltU0PTfGTSNfYipLWnFwTi6g8Q-JRzJzhFDOio4',
            agreement_type: 'License Agreement',
            industry: 'Pharmaceutical R&D',
            research_lead: 'The Scheibye-Knudsen Lab',
          },
        },
        {
          id: 2,
          name: 'The Longevity Molecule (IPNFT) 2',
          description:
            'The Scheibye-Knudsen lab has analyzed 1.5 billion prescriptions from 4.8 million individuals over 40 years in The Danish National Health Service Prescription Database and correlated this with the survival of individuals prescribed certain drugs. The Scheibye-Knudsen Lab has identified several FDA-approved medications that appear to have a strong effect on lifespan following analysis. This project focuses on testing and developing three of these small molecules as possible interventions in aging, with the first series of experiments testing these therapies in fruit flies and human cells. This is an exclusive license agreement for the IP resulting from these experiments.',
          external_url: 'https://dao.vitadao.com/#/proposals/funding/3',
          image: 'https://arweave.net/gQm_NpkJIjEFD6sOVHLEJ-tZIKhRvgmYEl5es0g-YdQ',
          properties: {
            nvm_metadata: 'https://arweave.net:443/qGsHltU0PTfGTSNfYipLWnFwTi6g8Q-JRzJzhFDOio4',
            agreement_type: 'License Agreement',
            industry: 'Pharmaceutical R&D',
            research_lead: 'The Scheibye-Knudsen Lab',
          },
        },
      ],
    }

    // const { result, loading, error } = useQuery(gql`
    //   query getProposals {
    //     proposals(first: 99, orderBy: createdAt, orderDirection: desc) {
    //       ...ProposalDetails
    //     }

    //     _meta {
    //       block {
    //         number
    //       }
    //     }
    //   }
    //   ${proposalFragment}
    // `)

    // const blockNumber = useResult(result, null, (data) => data._meta.block.number)

    return {
      loading,
      result,
      error,
      // blockNumber,
    }
  },
})
</script>
