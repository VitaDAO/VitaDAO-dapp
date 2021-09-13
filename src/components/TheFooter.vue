<template>
  <footer
    class="
      bg-gray-900
      flex flex-col
      items-center
      justify-center
      pb-20
      pt-12
      px-4
      sm:py-12
      text-white
    "
  >
    <p>© {{ dayjs().format('YYYY') }} VitaDAO. All rights reserved</p>
    <div class="flex mt-2 space-x-2">
      <a href="https://discord.com/invite/3S3ftnm" class="hover:text-vita-accent" target="_blank"
        ><fa :icon="['fab', 'discord']" size="lg"
      /></a>
      <a href="https://gov.vitadao.com/" class="hover:text-vita-accent" target="_blank"
        ><fa :icon="['fab', 'discourse']" size="lg"
      /></a>
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
