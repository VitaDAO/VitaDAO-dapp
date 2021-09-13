<template>
  <div class="w-full">
    <h2 class="font-bold mb-2 text-gray-800 text-xl">All proposals</h2>
    <transition name="fade" mode="out-in">
      <loading-indicator v-if="loading">Loading proposals…</loading-indicator>
      <div v-else-if="error">Error: {{ error.message }}</div>
      <proposals-list
        v-else-if="result && result.proposals"
        :proposals="result.proposals"
        :block-number="blockNumber"
      />
    </transition>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useQuery, useResult } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import ProposalsList from '@/components/ProposalsList'
import LoadingIndicator from '@/components/LoadingIndicator'

export const proposalFragment = gql`
  fragment ProposalDetails on Proposal {
    id
    title
    status
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
  components: { ProposalsList, LoadingIndicator },
  setup() {
    const { result, loading, error } = useQuery(gql`
      query getProposals {
        proposals(first: 99, orderBy: createdAt, orderDirection: desc) {
          ...ProposalDetails
        }

        _meta {
          block {
            number
          }
        }
      }
      ${proposalFragment}
    `)

    const blockNumber = useResult(result, null, (data) => data._meta.block.number)

    return {
      loading,
      result,
      error,
      blockNumber,
    }
  },
})
</script>
