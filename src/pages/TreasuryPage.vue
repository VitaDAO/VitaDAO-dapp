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
    </div>
  </div>
</template>

<script setup>
import TokenList from '@/components/TokenList.vue'
import { useTreasuryTokens } from '@/utils/queries'

const { data: vitadaoEthTokens } = useTreasuryTokens('0xf5307a74d1550739ef81c6488dc5c7a6a53e5ac2')
const { data: opsVitadaoEthTokens } = useTreasuryTokens(
  '0x4472e37170B12c9Ab7aa1aF0903E8C392aad4CbB',
)
</script>
