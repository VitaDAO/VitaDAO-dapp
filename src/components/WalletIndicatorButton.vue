<template>
  <div>
    <button
      class="
        bg-gray-700
        border border-transparent
        duration-150
        flex
        focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2
        font-bold
        hover:bg-gray-600
        items-center
        pr-4
        px-3
        py-1.5
        rounded-xl
        shadow-lg
        text-sm text-white
        transition-all
      "
      @click="openConnectWalletModal"
    >
      <span
        v-if="!walletIsConnected"
        class="bg-gray-800 flex h-8 items-center justify-center mr-3 rounded-full text-white w-8"
        ><fa icon="wallet"
      /></span>
      <template v-else>
        <div
          v-if="isTransacting"
          class="
            bg-gray-800
            flex
            h-8
            items-center
            justify-center
            mr-3
            overflow-hidden
            rounded-full
            text-white
            w-8
          "
        >
          <fa icon="spinner" spin />
        </div>
        <div
          v-else-if="walletProvider == 'injected'"
          class="flex h-8 items-center justify-center mr-3 overflow-hidden text-white w-8"
        >
          <jazzicon address="connectedAddress" :diameter="28" class="mt-1" />
        </div>
        <div
          v-else
          class="
            bg-gray-800
            flex
            h-8
            items-center
            justify-center
            mr-3
            overflow-hidden
            rounded-full
            text-white
            w-8
          "
        >
          <img src="@/assets/walletConnect.svg" class="h-3 w-auto" />
        </div>
      </template>

      <template v-if="walletIsConnected">
        <span v-if="ensName" class="ens-shortened truncate"> {{ ensName }} </span>
        <template v-else>
          {{ shortenAddress(connectedAddress) }}
        </template>
      </template>
      <template v-else> Connect Wallet </template>
    </button>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Jazzicon from 'vue3-jazzicon/src/components'
import { shortenAddress } from '@/utils'

export default {
  components: {
    Jazzicon,
  },
  props: {},
  setup() {
    const store = useStore()
    const router = useRouter()

    const walletIsConnected = computed(() => store.state.wallet.isConnected)

    function openConnectWalletModal() {
      if (!walletIsConnected.value) {
        store.commit('wallet/setConnectWalletModalIsOpen', true)
      } else {
        router.push({ name: 'WalletPage' })
      }
    }

    return {
      isTransacting: computed(() => store.getters['wallet/isTransacting']),
      walletProvider: computed(() => store.state.wallet.walletProvider),
      connectedAddress: computed(() => store.state.wallet.connectionInfo.address),
      ensName: computed(() => store.state.wallet.ensName),
      walletIsConnected,
      openConnectWalletModal,
      shortenAddress,
    }
  },
}
</script>

<style scoped lang="postcss">
.ens-shortened {
  max-width: 9rem;
}
</style>
