<template>
  <div
    class="
      bg-gray-800
      flex flex-shrink-0
      h-16
      items-center
      justify-between
      px-6
      relative
      shadow
      text-white
      z-10
    "
    :class="{ 'mt-16': isWrongNetwork }"
  >
    <router-link class="block" to="/"
      ><img src="../assets/logo.svg" class="h-6 w-auto"
    /></router-link>
    <div class="hidden lg:flex lg:items-center">
      <ul class="flex space-x-4">
        <li v-for="item in navItems" :key="item.name">
          <router-link
            :to="item.to"
            :class="[
              $route.path === item.to ? 'bg-gray-600 text-white' : 'text-white hover:bg-gray-700',
              'group flex items-center px-2 py-2 text-base font-medium rounded-md pr-3',
            ]"
          >
            <fa
              fixed-width
              class="flex-shrink-0 ml-1 mr-3 text-vita-accent"
              :icon="item.icon"
              aria-hidden="true"
              size="lg"
            />
            {{ item.name }}
          </router-link>
        </li>
      </ul>
      <wallet-indicator-button class="ml-4" />
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
