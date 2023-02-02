<template>
  <div class="w-full">
    <hr class="border-black mb-8" />
    <h2 class="font-medium mb-1.5 sm:mb-4 text-black text-2xl sm:text-3xl">Treasury</h2>
    <div class="grid grid-cols-1 gap-6">
      <div class="border border-gray-300 p-6 rounded-2xl">
        <h3 class="text-xl pb-3 border-b border-gray-300 mb-5">vitadao.eth ERC-20 tokens</h3>
        <TokenList :tokens="vitadaoEthTokens" />
      </div>
      <div class="border border-gray-300 p-6 rounded-2xl">
        <h3 class="text-xl pb-3 border-b border-gray-300 mb-5">ops.vitadao.eth ERC-20 tokens</h3>
        <TokenList :tokens="opsVitadaoEthTokens" />
      </div>
      <div class="border border-gray-300 p-6 rounded-2xl">
        <h3 class="text-xl pb-3 border-b border-gray-300 mb-5">IP-NFTs</h3>
        <NftList :nfts="vitadaoEthNfts" />
      </div>
    </div>
  </div>
</template>

<script setup>
import NftList from '@/components/NftList.vue'
import TokenList from '@/components/TokenList.vue'
import { useNfts, useTreasuryTokens } from '@/utils/queries'

const { data: vitadaoEthTokens } = useTreasuryTokens('0xf5307a74d1550739ef81c6488dc5c7a6a53e5ac2')
const { data: opsVitadaoEthTokens } = useTreasuryTokens(
  '0x4472e37170B12c9Ab7aa1aF0903E8C392aad4CbB',
)
const { data: vitadaoEthNfts } = useNfts({
  owner: '0xf5307a74d1550739ef81c6488dc5c7a6a53e5ac2',
  contract: '0x42D2354EF0b54279516f5799791086F2f499086E',
})
</script>
