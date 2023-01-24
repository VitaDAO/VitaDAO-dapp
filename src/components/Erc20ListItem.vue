<template>
  <div v-if="props.token">
    <pre>{{ props.token }}</pre>
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
