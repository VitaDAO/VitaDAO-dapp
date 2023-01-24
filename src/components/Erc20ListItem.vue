<template>
  <div v-if="props.token" class="flex items-center gap-3">
    <img v-if="props.token.src" :src="props.token.src" alt="" class="rounded-full h-[40px]" />
    <div
      v-else
      class="rounded-full h-[40px] w-[40px] flex-shrink-0 bg-gray-300 flex items-center justify-center"
    >
      <span class="text-sm">{{
        props.token.name
          .split(/\s|\./)
          .slice(0, 3)
          .map((term) => term[0])
          .join('')
          .toUpperCase()
      }}</span>
    </div>
    <div class="flex-grow">
      <div class="flex gap-2 font-medium items-center">
        <a
          v-if="props.token.address"
          :href="`https://etherscan.io/address/${props.token.address}`"
          >{{ props.token.name }}</a
        >
        <span v-else>{{ props.token.name }}</span>
        <span class="text-[15px] px-1 rounded-lg bg-gray-200 leading-5">{{
          props.token.percent
        }}</span>
        <span class="flex-grow text-right">{{ props.token.value }}</span>
      </div>
      <div class="flex gap-2">
        <span class="text-gray-500">{{ props.token.treasury }}</span>
        <!-- <span
                class="flex-grow text-right"
                :class="[props.token.stats[0] === '+' ? 'text-green-500' : 'text-red-500']"
                >{{ props.token.stats }}</span
              > -->
      </div>
    </div>
  </div>
  <div v-else class="flex items-center gap-3 animate-pulse">
    <div class="rounded-full h-[40px] w-[40px] bg-gray-300" />
    <div class="flex-grow flex flex-col gap-1">
      <div class="flex gap-2 justify-between">
        <span class="bg-gray-300 h-4 w-32 rounded-sm" />
        <span class="bg-gray-300 h-4 w-32 rounded-sm" />
      </div>
      <div class="flex gap-2 justify-between">
        <span class="bg-gray-300 h-4 w-44 rounded-sm" />
        <span class="bg-gray-300 h-4 w-44 rounded-sm" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  token: {
    type: Object,
    required: false,
  },
})
</script>
