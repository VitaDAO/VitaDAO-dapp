<template>
  <div
    ref="nav"
    class="bg-white lg:sticky lg:top-0 lg:z-20 main-nav"
    :class="{ 'mt-16': isWrongNetwork }"
  >
    <div class="px-6 text-black flex justify-center py-5">
      <div class="flex flex-shrink-0 items-center justify-between max-w-8xl w-full">
        <router-link class="block" to="/"
          ><img src="../assets/images/logo.svg" class="h-8 w-auto"
        /></router-link>
        <div class="hidden lg:flex lg:items-center">
          <ul class="flex space-x-8">
            <li v-for="item in navItems" :key="item.name">
              <router-link
                :to="item.to"
                class="nav-link"
                :class="['group flex items-center text-lg font-medium rounded-md']"
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
  </div>
</template>

<script>
import { defineComponent, computed, onMounted, onUnmounted, ref } from 'vue'
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
    const nav = ref(null)
    const store = useStore()

    let handleScroll = function () {
      const currentScroll = window.pageYOffset
      if (currentScroll <= 0) {
        nav.value.classList.remove('not-top')
        return
      }

      if (!nav.value.classList.contains('not-top')) {
        nav.value.classList.add('not-top')
      }
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      isWrongNetwork: computed(() => store.getters['wallet/isWrongNetwork']),
      nav,
    }
  },
})
</script>

<style lang="postcss" scoped>
.main-nav {
  transition: box-shadow 0.15s ease-in-out;
}

.not-top {
  @apply lg:shadow-lg;
}

.nav-link {
  cursor: pointer;
  position: relative;
}

.nav-link::before,
.nav-link::after {
  position: absolute;
  width: 100%;
  height: 1px;
  background: currentColor;
  top: 100%;
  left: 0;
  pointer-events: none;
}

.nav-link::before {
  content: '';
}

.nav-link::before {
  transform-origin: 100% 50%;
  transform: scale3d(0, 1, 1);
  transition: transform 0.3s;
}

.nav-link:hover::before {
  transform-origin: 0% 50%;
  transform: scale3d(1, 1, 1);
}

.router-link-active {
  @apply text-vita-purple;
}
</style>
