<template>
  <footer
    class="bg-black px-6 pt-10 text-white bg-50 bg-no-repeat bg-right flex justify-center pb-20 lg:pb-10"
  >
    <div class="max-w-8xl w-full">
      <img src="../assets/images/logo_white.svg" class="h-8 w-auto" />
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mt-10 mb-10 sm:mt-32 sm:mb-28 text-lg font-medium"
      >
        <div>
          <ul>
            <li>
              <a class="underline-animated" href="https://vitadao.com" target="_blank"
                >VitaDAO Home</a
              >
            </li>
            <li>
              <a class="underline-animated" href="https://vitadao.com/about" target="_blank"
                >About</a
              >
            </li>
            <li>
              <a class="underline-animated" href="https://vitadao.com/community" target="_blank"
                >Community</a
              >
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li>
              <a
                class="underline-animated"
                href="https://vitadao.com/submit-project"
                target="_blank"
                >Apply for funding</a
              >
            </li>
            <li>
              <a
                class="underline-animated"
                href="https://discord.com/invite/vitadao"
                target="_blank"
                >Join the community</a
              >
            </li>
          </ul>
        </div>
      </div>
      <p class="text-sm text-gray-400">
        © {{ dayjs().format('YYYY') }} VitaDAO. All rights reserved.
        <a href="https://vitadao.com/imprint" target="_blank" class="underline">Imprint</a>
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

<style scoped>
footer {
  @media screen(sm) {
    background-image: url(../assets/images/footer_img.jpg);
  }
}
</style>
