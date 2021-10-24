<template>
  <div class="w-full">
    <h2 class="font-bold mb-2 text-white text-xl">Fractionalized</h2>
    <transition name="fade" mode="out-in">
      <loading-indicator v-if="loading">Loading vaults…</loading-indicator>
      <div v-else-if="error">Error: {{ error.message }}</div>
      <portfolio-list v-else-if="fractionalizedTokens" :ipnfts="fractionalizedTokens" />
    </transition>
    <h2 class="font-bold mb-2 mt-4 text-white text-xl">100% Owned By DAO</h2>
    <transition name="fade" mode="out-in">
      <loading-indicator v-if="loading">Loading tokens…</loading-indicator>
      <div v-else-if="error">Error: {{ error.message }}</div>
      <portfolio-list
        v-else-if="nonFractionalizedTokens"
        :ipnfts="nonFractionalizedTokens"
        :fractionalized="false"
      />
    </transition>
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
        fractionalVaults(first: 99, orderBy: vaultId, orderDirection: asc) {
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

        account(id: "0x10836d93f39cc896651c210084f98b63e1055529") {
          id
          nfts {
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

    const nonFractionalizedTokens = useResult(result, null, function (data) {
      return data.account.nfts
    })

    return {
      loading,
      result,
      error,
      fractionalizedTokens,
      nonFractionalizedTokens,
    }
  },
})
</script>
