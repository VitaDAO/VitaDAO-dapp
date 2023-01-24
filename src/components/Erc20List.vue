<template>
  <div class="space-y-5">
    <template v-if="props.tokens">
      <div v-for="token in tokens" :key="token.name" class="flex items-center gap-3">
        <img v-if="token.src" :src="token.src" alt="" class="rounded-full h-[40px]" />
        <div
          v-else
          class="rounded-full h-[40px] w-[40px] flex-shrink-0 bg-gray-300 flex items-center justify-center"
        >
          <span class="text-sm">{{
            token.name
              .split(/\s|\./)
              .slice(0, 3)
              .map((term) => term[0])
              .join('')
              .toUpperCase()
          }}</span>
        </div>
        <div class="flex-grow">
          <div class="flex gap-2 font-medium items-center">
            <a v-if="token.address" :href="`https://etherscan.io/address/${token.address}`">{{
              token.name
            }}</a>
            <span v-else>{{ token.name }}</span>
            <span class="text-[15px] px-1 rounded-lg bg-gray-200 leading-5">{{
              token.percent
            }}</span>
            <span class="flex-grow text-right">{{ token.value }}</span>
          </div>
          <div class="flex gap-2">
            <span class="text-gray-500">{{ token.treasury }}</span>
            <!-- <span
                class="flex-grow text-right"
                :class="[token.stats[0] === '+' ? 'text-green-500' : 'text-red-500']"
                >{{ token.stats }}</span
              > -->
          </div>
        </div>
      </div>
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
