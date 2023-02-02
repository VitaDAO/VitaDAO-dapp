<template>
  <div v-if="props.nft" class="border border-gray-300 rounded-2xl overflow-hidden">
    <template v-if="props.nft.image_url">
      <MediaElement :src="props.nft.image_url" alt="" class="w-full h-56 object-cover" />
    </template>
    <template v-else><div class="w-full h-56 bg-gray-300" /></template>
    <div class="p-3">
      <p>{{ props.nft.name }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import MediaElement from './MediaElement.vue'

const props = defineProps({
  nft: {
    type: Object,
    required: false,
  },
})
</script>
