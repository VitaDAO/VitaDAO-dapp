<template>
  <div>
    <base-button
      v-if="!walletIsConnected"
      size="sm"
      type="primary"
      icon="wallet"
      @click="openConnectWalletModal"
      >Connect Wallet</base-button
    >
    <div
      v-else
      @click="openConnectWalletModal"
      class="bg-white cursor-pointer pl-1 pr-3.5 py-1 text-base font-medium rounded-full border border-gray-300 flex items-center"
    >
      <div
        v-if="isTransacting"
        class="bg-vita-sunrise flex h-8 items-center justify-center mr-2 overflow-hidden rounded-full text-black w-8"
      >
        <fa icon="spinner" spin />
      </div>
      <div
        v-else-if="walletProvider == 'injected'"
        class="flex h-8 items-center justify-center mr-2 overflow-hidden text-white w-8"
      >
        <jazzicon address="connectedAddress" :diameter="28" class="mt-2" />
      </div>
      <div
        v-else
        class="bg-gray-200 flex h-8 items-center justify-center mr-2 overflow-hidden rounded-full text-white w-8"
      >
        <img src="@/assets/images/walletConnect.svg" class="h-3 w-auto" />
      </div>

      <span v-if="ensName" class="ens-shortened truncate"> {{ ensName }} </span>
      <template v-else>
        {{ shortenAddress(connectedAddress) }}
      </template>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Jazzicon from 'vue3-jazzicon/src/components'
import { shortenAddress } from '@/utils'
import BaseButton from '@/components/BaseButton'

export default {
  components: {
    Jazzicon,
    BaseButton,
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

<style scoped>
.ens-shortened {
  max-width: 9rem;
}
</style>
