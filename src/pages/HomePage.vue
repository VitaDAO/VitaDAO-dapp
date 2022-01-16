<template>
  <div class="w-full">
    <hr class="border-black mb-8" />
    <h2 class="font-medium mb-1.5 sm:mb-4 text-black text-2xl sm:text-3xl">Active proposals</h2>
    <transition name="fade" mode="out-in">
      <loading-indicator v-if="loading">Loading active proposals…</loading-indicator>
      <div v-else-if="error">Error: {{ error.message }}</div>
      <ul
        v-else-if="result && result.proposals && result.proposals.length > 0"
        role="list"
        class="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      >
        <snapshot-proposal-box
          :proposal="proposal"
          v-for="proposal in result.proposals"
          :key="proposal.id"
        />
      </ul>
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
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { shortenAddress } from '@/utils'
import LoadingIndicator from '@/components/LoadingIndicator'
import SnapshotProposalBox from '@/components/SnapshotProposalBox.vue'

export default defineComponent({
  components: { SnapshotProposalBox, LoadingIndicator },
  setup() {
    dayjs.extend(relativeTime)

    const { result, loading, error } = useQuery(
      gql`
        query Proposals($snapshotSpace: String!) {
          proposals(
            first: 999
            where: { space: $snapshotSpace, state: "active" }
            orderBy: "created"
            orderDirection: desc
          ) {
            id
            title
            start
            end
            state
            choices
            strategies {
              name
              params
            }
            network
            snapshot
            space {
              voting {
                quorum
              }
            }
            link
            scores
            scores_total
          }
        }
      `,
      () => ({
        snapshotSpace: process.env.VUE_APP_SNAPSHOT_SPACE,
      }),
      { clientId: 'snapshot' },
    )

    return {
      loading,
      result,
      error,
      shortenAddress,
      dayjs,
    }
  },
})
</script>
