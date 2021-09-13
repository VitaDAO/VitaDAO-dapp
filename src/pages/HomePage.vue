<template>
  <div class="w-full">
    <h2 class="font-bold mb-2 text-gray-800 text-xl">Active proposals</h2>
    <transition name="fade" mode="out-in">
      <loading-indicator v-if="loading">Loading active proposals…</loading-indicator>
      <div v-else-if="error">Error: {{ error.message }}</div>
      <proposals-list
        v-else-if="result && result.proposals && result.proposals.length > 0"
        :proposals="result.proposals"
        :block-number="blockNumber"
      />
      <div v-else>
        <div class="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center w-full">
          <fa icon="folder-open" class="text-gray-300" size="2x" />
          <span class="block font-medium mt-2 text-gray-800 text-sm">
            Currently no active proposals.
            <router-link class="underline" to="/proposals">See all proposals</router-link>
          </span>
        </div>
      </div>
    </transition>
    <h2 class="mt-10 font-bold mb-2 text-gray-800 text-xl">Last votes</h2>
    <transition name="fade" mode="out-in">
      <loading-indicator v-if="loading">Loading votes…</loading-indicator>
      <div v-else-if="error">Error: {{ error.message }}</div>
      <div
        v-else-if="result && result.votes && result.votes.length > 0"
        class="gap-3 grid grid-cols-1 xl:grid-cols-2"
      >
        <div
          v-for="vote in result.votes"
          :key="vote.id"
          class="
            text-sm text-white
            rounded-lg
            px-4
            sm:px-6
            py-3
            sm:py-4
            shadow-sm
            bg-gradient-to-b
            from-gray-600
            to-gray-700
          "
        >
          <a
            target="_blank"
            class="font-bold hover:underline"
            :href="'https://etherscan.io/address/' + vote.voter.id"
            >{{ shortenAddress(vote.voter.id) }}</a
          >
          voted
          <span v-if="vote.direction == true" class="text-green-400">Yes</span>
          <span v-else class="text-red-400">No</span> on »<router-link
            class="font-bold hover:underline"
            :to="'/proposal/' + vote.proposal.id"
            >{{ vote.proposal.proposalContent.title }}</router-link
          >« with
          {{
            new Intl.NumberFormat('en', { maximumFractionDigits: 0 }).format(
              parseFloat(vote.weight),
            )
          }}
          VITA ({{ dayjs.unix(vote.createdAt).fromNow() }})
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useQuery, useResult } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { shortenAddress } from '@/utils'
import { proposalFragment } from '@/pages/ProposalsPage'
import ProposalsList from '@/components/ProposalsList'
import LoadingIndicator from '@/components/LoadingIndicator'

export default defineComponent({
  components: { ProposalsList, LoadingIndicator },
  setup() {
    dayjs.extend(relativeTime)

    const { result, loading, error } = useQuery(gql`
      query getActiveProposalsAndVotes {
        proposals(
          first: 99
          orderBy: createdAt
          orderDirection: desc
          where: { status: "VOTING" }
        ) {
          ...ProposalDetails
        }
        _meta {
          block {
            number
          }
        }
        votes(first: 20, orderBy: createdAt, orderDirection: desc) {
          id
          direction
          weight
          createdAt
          proposal {
            id
            proposalContent {
              title
            }
          }
          voter {
            id
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
      shortenAddress,
      dayjs,
    }
  },
})
</script>
