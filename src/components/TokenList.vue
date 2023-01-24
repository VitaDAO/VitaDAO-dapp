<template>
  <div class="space-y-5">
    <template v-if="props.tokens">
      <TokenListItem v-for="token in props.tokens" :key="token.name" :token="token" />
    </template>
    <template v-else>
      <TokenListItem />
      <TokenListItem />
      <TokenListItem />
      <TokenListItem />
      <TokenListItem />
    </template>
  </div>
</template>

<script setup>
import TokenListItem from '@/components/TokenListItem.vue'
import { defineProps } from 'vue'

const props = defineProps({
  tokens: {
    type: Array,
    required: false,
  },
})
</script>
