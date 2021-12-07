<template>
  <div class="w-full">
    <hr class="border-black mb-8" />
    <h2 class="font-medium mb-4 text-black text-3xl">DAO Snapshot</h2>


    <div class="flex space-x-5">
     
    <div class="w-80 h-48 bg-vita-purple rounded-2xl inline-block">
      <div class="pl-8 pt-6">
        <h2 class="text-white text-3xl font-bold">$ 25,016,640</h2>

        <p class="inline-block text-white place-items-center">+14% ($3,709,104)</p>
        <p class="inline-block pl-2 text-vita-gray">weekly</p>

        <p class="text-red-50 align-bottom pt-14">Treasury Value</p>
      </div>
    </div>

    <div class="w-80 h-48 bg-vita-sunrise rounded-2xl inline-block">
      <div class="pl-8 pt-6">
        <h2 class="text-black text-3xl font-bold"> 19.483.234</h2>
        <p class="text-black align-bottom pt-20">Circulating Supply</p>
      </div>
    </div>

    <div class="w-80 h-48 bg-vita-sunrise rounded-2xl inline-block">
      <div class="pl-8 pt-6">
        <h2 class="text-black text-3xl font-bold">$ 25,000,000</h2>
        <p class="text-black align-bottom pt-20">VitaDAO Market Cap</p>
      </div>
    </div>

    <div class="w-80 h-48 bg-vita-sunrise rounded-2xl inline-block">
      <div class="pl-8 pt-6">
        <h2 class="text-black text-3xl font-bold">$ 350,000</h2>
        <p class="text-black align-bottom pt-20">Invested in ressearch</p>
      </div>
    </div>

    </div>



    <hr class="border-black mb-8 mt-8" />
    <h2 class="font-medium mb-4 text-black text-3xl">Active proposals</h2>
    <transition name="fade" mode="out-in">
      <loading-indicator v-if="loading">Loading active proposals…</loading-indicator>
      <div v-else-if="error">Error: {{ error.message }}</div>
      <proposals-list
        v-else-if="result && result.proposals && result.proposals.length > 0"
        :proposals="result.proposals"
        :block-number="blockNumber"
      />
      <div v-else>
        <div class="border-2 border-dashed border-gray-300 p-6 rounded-xl text-center w-full">
          <fa icon="folder-open" class="text-vita-purple" size="2x" />
          <span class="block font-medium mt-2 text-black">
            Currently there are no active proposals.
            <router-link class="underline" to="/proposals">See all proposals</router-link>
          </span>
        </div>
      </div>
    </transition>
    <hr class="border-black mb-8 mt-20" />
    <h2 class="font-medium mb-4 text-black text-3xl">Latest votes</h2>
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
          class="text-sm text-black rounded-2xl px-4 sm:px-6 py-3 sm:py-4 border border-gray-300"
        >
          <a
            target="_blank"
            class="font-bold hover:underline"
            :href="'https://etherscan.io/address/' + vote.voter.id"
            >{{ shortenAddress(vote.voter.id) }}</a
          >
          voted
          <span v-if="vote.direction == true" class="text-success">Yes</span>
          <span v-else class="text-danger">No</span> on »<router-link
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
