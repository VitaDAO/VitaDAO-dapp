<template>
  <footer
    :style="{
      'background-image': 'url(' + require('../assets/images/footer_img.jpg') + ')',
    }"
    class="bg-black px-6 py-10 text-white bg-50 bg-no-repeat bg-right flex justify-center"
  >
    <div class="max-w-8xl w-full">
      <img src="../assets/images/logo_white.svg" class="h-8 w-auto" />
      <div class="grid grid-cols-4 mt-32 mb-28 text-lg font-medium">
        <div>
          <ul>
            <li><a class="underline-animated" href="#">VitaDAO Home</a></li>
            <li><a class="underline-animated" href="#">About</a></li>
            <li><a class="underline-animated" href="#">Community</a></li>
          </ul>
        </div>
        <div>
          <ul>
            <li><a class="underline-animated" href="#">Aply for funding</a></li>
            <li><a class="underline-animated" href="#">Join the community</a></li>
          </ul>
        </div>
      </div>
      <p class="text-sm text-gray-200">
        © {{ dayjs().format('YYYY') }} VitaDAO. All rights reserved.
        <a href="#" class="underline">Imprint</a>
      </p>
    </div>
  </footer>
</template>

<script>
import { defineComponent } from 'vue'
import dayjs from 'dayjs'

export default defineComponent({
  components: {},
  setup() {
    return {
      dayjs,
    }
  },
})
</script>
