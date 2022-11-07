<template>
  <div class="w-full">
    <hr class="border-black mb-8" />
    <h2 class="font-medium mb-1.5 sm:mb-4 text-black text-2xl sm:text-3xl">DAO Snapshot</h2>
    <dao-stats />
  </div>
  <div class="w-full">
    <hr class="border-black mb-8" />
    <h2 class="font-medium mb-1.5 sm:mb-4 text-black text-2xl sm:text-3xl">Active proposals</h2>
    <transition name="fade" mode="out-in">
      <loading-indicator v-if="loading">Loading active proposals…</loading-indicator>
      <div v-else-if="error">Error: {{ error.message }}</div>
      <ul
        v-else-if="result.active && result.active && result.active.length > 0"
        role="list"
        class="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      >
        <snapshot-proposal-box
          :proposal="proposal"
          v-for="proposal in result.active"
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
  <div class="w-full">
    <hr class="border-black mb-8" />
    <h2 class="font-medium mb-1.5 sm:mb-4 text-black text-2xl sm:text-3xl">Past proposals</h2>
    <transition name="fade" mode="out-in">
      <loading-indicator v-if="loading">Loading past proposals…</loading-indicator>
      <div v-else-if="error">Error: {{ error.message }}</div>
      <ul
        v-else-if="result.past && result.past && result.past.length > 0"
        role="list"
        class="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      >
        <snapshot-proposal-box
          :proposal="proposal"
          v-for="proposal in result.past"
          :key="proposal.id"
        />
      </ul>
      <div v-else>
        <div class="border-2 border-dashed border-gray-300 p-6 rounded-xl text-center w-full">
          <fa icon="folder-open" class="text-vita-purple" size="2x" />
          <span class="block font-medium mt-2 text-black">
            Currently there are no past proposals.
            <router-link class="underline" to="/proposals">See all proposals</router-link>
          </span>
        </div>
      </div>
    </transition>
  </div>
  <div class="w-full">
    <hr class="border-black mb-8" />
    <h2 class="font-medium mb-1.5 sm:mb-4 text-black text-2xl sm:text-3xl">Treasury</h2>
    <transition name="fade" mode="out-in">
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <treasury-graph />
        <treasury-list />
      </div>
    </transition>
  </div>
</template>

<script>
import DaoStats from '@/components/DaoStats.vue'
import LoadingIndicator from '@/components/LoadingIndicator'
import SnapshotProposalBox from '@/components/SnapshotProposalBox.vue'
import TreasuryGraph from '@/components/TreasuryGraph.vue'
import TreasuryList from '@/components/TreasuryList.vue'
import { shortenAddress } from '@/utils'
import { useQuery } from '@vue/apollo-composable'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import gql from 'graphql-tag'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { DaoStats, SnapshotProposalBox, LoadingIndicator, TreasuryGraph, TreasuryList },
  setup() {
    dayjs.extend(relativeTime)

    const { result, loading, error } = useQuery(
      gql`
        query getProposals($snapshotSpace: String!) {
          active: proposals(
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
          past: proposals(first: 6, orderBy: "created", orderDirection: desc) {
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
