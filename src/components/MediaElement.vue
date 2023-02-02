<template>
  <div v-if="status === 'loading'" :class="props.class" class="bg-gray-300 animate-pulse" />
  <div
    v-else-if="status === 'error'"
    :class="props.class"
    class="bg-red-100 flex items-center justify-center"
  >
    <span class="text-red-500 p-3 text-center text-sm">{{ error.message }}</span>
  </div>
  <img v-else-if="contentType.startsWith('image')" v-bind="props" />
  <video
    v-else-if="contentType.startsWith('video')"
    :src="props.src"
    :class="props.class"
    autoplay
    loop
  />
</template>

<script setup>
import { defineProps } from 'vue'

import { useContentType } from '@/utils/queries'

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: '',
  },
  class: {
    type: String,
    required: false,
  },
})

const { data: contentType, status, error } = useContentType(props.src)
</script>
