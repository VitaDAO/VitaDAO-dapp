<template>
  <base-modal v-model:open="connectWalletModalIsOpen">
    <h2 class="font-medium mb-2 sm:text-lg">
      <transition name="fade" mode="out-in">
        <span v-if="loadingUserDetails">
          <fa icon="spinner" spin class="mr-1" />
          Connecting wallet…</span
        >
        <span v-else>Choose your wallet</span>
      </transition>
    </h2>
    <div class="flex sm:space-x-4 space-x-2 w-full">
      <button
        class="
          bg-gray-700
          border border-transparent
          duration-150
          flex flex-col
          font-medium
          hover:bg-gray-800
          items-center
          justify-center
          px-5
          py-4
          rounded-lg
          shadow-sm
          sm:py-6 sm:text-base
          text-white text-xs
          transition-all
          w-full
        "
        @click="connectInjectedWallet"
      >
        <img class="h-6 sm:h-10 w-auto" src="@/assets/metamask.svg" />
        <div class="mt-2 sm:mt-3">
          <span>Metamask</span>
        </div>
      </button>
      <button
        class="
          bg-gray-700
          border border-transparent
          duration-150
          flex flex-col
          font-medium
          hover:bg-gray-800
          items-center
          justify-center
          px-5
          py-4
          rounded-lg
          shadow-sm
          sm:py-6 sm:text-base
          text-white text-xs
          transition-all
          w-full
        "
        @click="connectWalletConnect"
      >
        <img class="h-6 sm:h-10 w-auto" src="@/assets/walletConnect.svg" />
        <div class="mt-2 sm:mt-3">
          <span>WalletConnect</span>
        </div>
      </button>
    </div>
  </base-modal>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { injectedWalletAvailable } from '@/utils'
import BaseModal from '@/components/BaseModal'

export default defineComponent({
  components: {
    BaseModal,
  },
  setup() {
    const store = useStore()

    let connectWalletModalIsOpen = computed({
      get: () => store.state.wallet.connectWalletModalIsOpen,
      set: (value) => store.commit('wallet/setConnectWalletModalIsOpen', value),
    })

    const loadingUserDetails = computed(() => store.state.wallet.loadingUserDetails)

    async function connectInjectedWallet() {
      if (injectedWalletAvailable()) {
        if (!loadingUserDetails.value) {
          try {
            await store.dispatch('wallet/connectInjected')
            connectWalletModalIsOpen.value = false
          } catch (e) {
            console.log('error connecting injected provider')
            console.log(e)
          }
        }
      } else {
        alert('No injected web3 provider available')
      }
    }

    async function connectWalletConnect() {
      try {
        if (!loadingUserDetails.value) {
          await store.dispatch('wallet/connectWalletConnect')
          connectWalletModalIsOpen.value = false
        }
      } catch (e) {
        console.log(e)
      }
    }

    return {
      connectWalletModalIsOpen,
      connectWalletConnect,
      connectInjectedWallet,
      loadingUserDetails,
    }
  },
})
</script>
