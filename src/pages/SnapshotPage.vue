<template>
  <div class="w-full">
    <hr class="border-black mb-8" />
    <h1 class="font-medium mb-4 text-black text-3xl">All proposals</h1>
    <transition name="fade" mode="out-in">
      <loading-indicator v-if="loading">Loading proposals…</loading-indicator>
      <div v-else-if="error">Error: {{ error.message }}</div>

      <ul
        v-else-if="result"
        role="list"
        class="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      >
        <snapshot-proposal-box
          :proposal="proposal"
          v-for="proposal in result.proposals"
          :key="proposal.id"
        />
      </ul>
    </transition>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import LoadingIndicator from '@/components/LoadingIndicator'
import SnapshotProposalBox from '@/components/SnapshotProposalBox.vue'

export default defineComponent({
  components: { LoadingIndicator, SnapshotProposalBox },
  setup() {
    const { result, loading, error } = useQuery(
      gql`
        query Proposals($snapshotSpace: String!) {
          proposals(
            first: 999
            where: { space: $snapshotSpace }
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
    }
  },
})
</script>
