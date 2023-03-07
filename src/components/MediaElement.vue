<template>
  <img v-if="display.as === 'image'" v-bind="props" @error="tryVideo" />
  <video
    v-else-if="display.as === 'video'"
    :src="props.src"
    :class="props.class"
    autoplay
    loop
    @error="fallbackToPlaceholder"
  />
  <div v-else-if="display.as === 'placeholder'" class="bg-gray-300" :class="props.class" />
</template>

<script setup>
import { defineProps, reactive } from 'vue'

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

const display = reactive({ as: 'image' })
const tryVideo = () => (display.as = 'video')
const fallbackToPlaceholder = () => (display.as = 'placeholder')
</script>
