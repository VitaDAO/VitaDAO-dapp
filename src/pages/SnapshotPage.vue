<template>
  <div class="w-full">
    <h2 class="font-bold mb-2 text-white text-xl">All proposals</h2>
    <div id="queryWrapper">
      <loading-indicator v-if="loading">Loading proposals…</loading-indicator>
      <div v-else-if="error">Error: {{ error.message }}</div>
      <div v-else-if="result">Result: {{ result.proposal }}</div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import LoadingIndicator from '@/components/LoadingIndicator'

export default defineComponent({
  components: { LoadingIndicator },
  setup() {
    const { result, loading, error } = useQuery(
      gql`
        query SnapshotProposal {
          proposal(id: "0xabe5c679efde41029e7c879f048c265c261aadb4459c49b1488e94d4033db0de") {
            id
            title
            body
            choices
            start
            end
            snapshot
            state
            author
            created
            plugins
            network
            strategies {
              name
              params
            }
            space {
              id
              name
            }
          }
        }
      `,
      null,
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
