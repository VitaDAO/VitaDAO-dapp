<template>
  <div
    class="bg-white px-6 relative text-black z-10 flex justify-center py-5"
    :class="{ 'mt-16': isWrongNetwork }"
  >
    <div class="flex flex-shrink-0 items-center justify-between max-w-8xl w-full">
      <router-link class="block" to="/"
        ><img src="../assets/images/logo.svg" class="h-8 w-auto"
      /></router-link>
      <div class="hidden lg:flex lg:items-center">
        <ul class="flex space-x-8">
          <li v-for="item in navItems" :key="item.name">
            <router-link
              :to="item.to"
              :class="[
                $route.path === item.to ? ' text-black' : 'text-black',
                'group flex items-center px-2 py-2 text-lg font-medium rounded-md pr-3',
              ]"
            >
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="hidden lg:flex lg:items-center">
        <wallet-indicator-button />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import WalletIndicatorButton from '@/components/WalletIndicatorButton'

export default defineComponent({
  components: {
    WalletIndicatorButton,
  },
  props: {
    navItems: {
      type: Array,
      required: true,
    },
  },

  setup() {
    const store = useStore()

    return {
      isWrongNetwork: computed(() => store.getters['wallet/isWrongNetwork']),
    }
  },
})
</script>
