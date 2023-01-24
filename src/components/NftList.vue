<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 auto-rows-fr gap-3"
  >
    <template v-if="props.nfts">
      <NftListItem
        v-for="nft in props.nfts.filter((nft) => nft.image_url || nft.name)"
        :key="nft.contract_address + nft.token_id"
        :nft="nft"
      />
    </template>
    <template v-else>
      <NftListItem />
      <NftListItem />
      <NftListItem />
      <NftListItem />
      <NftListItem />
      <NftListItem />
    </template>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import NftListItem from './NftListItem.vue'

const props = defineProps({
  nfts: {
    type: Array,
    required: false,
  },
})
</script>
