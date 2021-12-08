<template>
  <div class="flex flex-col items-center px-3 py-4 w-full">
    <lottie-player autoplay loop mode="normal" src="loading.json" class="w-32" />
    <div class="font-medium text-black"><slot /></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import '@lottiefiles/lottie-player'

export default defineComponent({
  components: {},
  props: {},

  setup() {},
})
</script>
