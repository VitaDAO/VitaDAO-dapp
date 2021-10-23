<template>
  <div class="w-full">
    <h2 class="font-bold mb-2 text-white text-xl">Fractionalized</h2>
    <transition name="fade" mode="out-in">
      <loading-indicator v-if="loading">Loading vaults…</loading-indicator>
      <div v-else-if="error">Error: {{ error.message }}</div>
      <portfolio-list v-else-if="fractionalizedTokens" :ipnfts="fractionalizedTokens" />
    </transition>
    <h2 class="font-bold mb-2 mt-4 text-white text-xl">100% Owned By DAO</h2>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useQuery, useResult } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import PortfolioList from '@/components/PortfolioList'
import LoadingIndicator from '@/components/LoadingIndicator'

export default defineComponent({
  components: { PortfolioList, LoadingIndicator },
  setup() {
    const { result, loading, error } = useQuery(gql`
      query getVaultsAndTokens {
        fractionalVaults(first: 99) {
          id
          price
          vaultId
          nftContract
          nft {
            id
            tokenURI
            tokenContract
            name
            description
            image
            externalUrl
            researchLead
            industry
            agreementType
            fractionalVault {
              id
            }
          }
        }
      }
    `)

    const fractionalizedTokens = useResult(result, null, function (data) {
      const onlyNfts = data.fractionalVaults.map((vault) => {
        return vault.nft
      })
      return onlyNfts
    })

    return {
      loading,
      result,
      error,
      fractionalizedTokens,
    }
  },
})
</script>
