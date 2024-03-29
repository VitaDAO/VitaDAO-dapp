<template>
  <div class="flex min-h-screen">
    <mobile-main-nav v-model:open="sidebarOpen" :nav-items="navigationItems" />

    <div class="flex flex-1 flex-col w-0">
      <div
        v-if="isWrongNetwork"
        class="bg-danger fixed flex font-bold h-16 items-center justify-center left-0 px-4 text-center text-sm text-white top-0 w-full z-20"
      >
        You're connected to the wrong network ({{ capitalize(currentNetwork.name) }}). Please
        connect to
        {{ capitalize(correctNetwork.name) }}
      </div>

      <main-nav :nav-items="navigationItems" />

      <main class="flex-1 focus:outline-none relative bg-fixed bg-no-repeat bg-contain bg-bottom">
        <div class="flex justify-center pb-20 pt-2 lg:pt-20 px-3 sm:px-6 md:px-8 lg:px-10">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <div :key="$route.name" class="max-w-8xl w-full flex flex-col gap-16 justify-center">
                <component :is="Component" :key="$route.path" />
              </div>
            </transition>
          </router-view>
        </div>
      </main>

      <the-footer />
    </div>
    <floating-mobile-nav @openNav="sidebarOpen = true" />
  </div>
  <connect-wallet-modal />
</template>

<script>
import BaseButton from '@/components/BaseButton'
import BaseModal from '@/components/BaseModal'
import ConnectWalletModal from '@/components/ConnectWalletModal'
import FloatingMobileNav from '@/components/FloatingMobileNav'
import MainNav from '@/components/MainNav'
import MobileMainNav from '@/components/MobileMainNav'
import TheFooter from '@/components/TheFooter'
import { capitalize } from '@/utils'
import { computed, defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'App',
  components: {
    FloatingMobileNav,
    BaseModal,
    BaseButton,
    ConnectWalletModal,
    TheFooter,
    MobileMainNav,
    MainNav,
  },
  setup() {
    const sidebarOpen = ref(false)
    const store = useStore()
    const route = useRoute()
    const navigationItems = [
      { name: 'Home', to: '/' },
      {
        name: 'Proposals',
        to: '/proposals',
      },
      {
        name: 'Treasury',
        to: '/treasury',
      },
      { name: 'Wallet', to: '/wallet' },
    ]

    watch(
      () => route.name,
      () => {
        sidebarOpen.value = false
      },
    )

    return {
      isWrongNetwork: computed(() => store.getters['wallet/isWrongNetwork']),
      correctNetwork: computed(() => store.getters['wallet/correctNetwork']),
      currentNetwork: computed(() => store.getters['wallet/currentNetwork']),
      navigationItems,
      sidebarOpen,
      capitalize,
    }
  },
})
</script>
