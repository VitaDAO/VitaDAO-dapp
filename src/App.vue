<template>
  <div class="bg-gray-100 flex min-h-screen">
    <mobile-main-nav v-model:open="sidebarOpen" :nav-items="navigationItems" />

    <div class="flex flex-1 flex-col overflow-hidden w-0">
      <div
        v-if="isWrongNetwork"
        class="
          bg-red-600
          fixed
          flex
          font-bold
          h-16
          items-center
          justify-center
          left-0
          px-4
          text-center text-sm text-white
          top-0
          w-full
          z-20
        "
      >
        You're connected to the wrong network. Please connect to {{ correctNetwork.name }}
      </div>

      <main-nav :nav-items="navigationItems" />

      <main class="flex-1 focus:outline-none relative">
        <div class="flex justify-center pb-20 pt-6 px-6">
          <div class="max-w-7xl w-full flex justify-center">
            <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in">
                <component :is="Component" :key="$route.path" />
              </transition>
            </router-view>
          </div>
        </div>
      </main>

      <the-footer />
    </div>
    <floating-mobile-nav @openNav="sidebarOpen = true" />
  </div>
  <connect-wallet-modal />
</template>

<script>
import { defineComponent, computed, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import MobileMainNav from '@/components/MobileMainNav'
import FloatingMobileNav from '@/components/FloatingMobileNav'
import BaseModal from '@/components/BaseModal'
import BaseButton from '@/components/BaseButton'
import ConnectWalletModal from '@/components/ConnectWalletModal'
import TheFooter from '@/components/TheFooter'
import MainNav from '@/components/MainNav'

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
      { name: 'Home', to: '/', icon: 'home' },
      {
        name: 'Proposals',
        to: '/proposals',
        icon: 'vote-yea',
      },
      { name: 'Wallet', to: '/wallet', icon: 'wallet' },
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
      navigationItems,
      sidebarOpen,
    }
  },
})
</script>
