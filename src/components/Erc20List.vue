<template>
  <div class="space-y-5">
    <template v-if="props.tokens">
      <Erc20ListItem v-for="token in props.tokens" :key="token.name" :token="token" />
    </template>
    <template v-else>
      <Erc20ListItem />
      <Erc20ListItem />
      <Erc20ListItem />
      <Erc20ListItem />
      <Erc20ListItem />
    </template>
  </div>
</template>

<script setup>
import Erc20ListItem from '@/components/Erc20ListItem.vue'
import { defineProps } from 'vue'

const props = defineProps({
  tokens: {
    type: Array,
    required: false,
  },
})
</script>
