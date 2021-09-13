<template>
  <div class="max-w-xl w-full">
    <h2 class="font-bold mb-2 text-gray-800 text-xl">Your Wallet</h2>
    <div v-if="walletIsConnected" class="flex flex-col space-y-2">
      <div
        class="
          flex
          justify-between
          text-white
          rounded-lg
          px-4
          sm:px-6
          py-3
          sm:py-4 sm:text-lg
          shadow-sm
          bg-gradient-to-b
          from-gray-600
          to-gray-700
        "
      >
        <span class="font-bold flex-shrink-0">Your Address</span>
        <span class="truncate">{{ ensName ? ensName : shortenAddress(connectedAddress, 5) }}</span>
      </div>
      <div
        class="
          flex
          justify-between
          text-white
          rounded-lg
          px-4
          sm:px-6
          py-3
          sm:py-4 sm:text-lg
          shadow-sm
          bg-gradient-to-b
          from-gray-500
          to-gray-600
        "
      >
        <span class="font-bold flex-shrink-0">ETH Balance</span>
        <span><animated-counter :decimals="2" :value="parseFloat(ethBalance)" />Ξ</span>
      </div>
      <div
        class="
          flex
          justify-between
          text-white
          rounded-lg
          px-4
          sm:px-6
          py-3
          sm:py-4 sm:text-lg
          shadow-sm
          bg-gradient-to-b
          from-gray-600
          to-gray-700
        "
      >
        <span class="font-bold flex-shrink-0">VITA Balance</span>
        <span><animated-counter :value="parseFloat(vitaBalance)" /> VITA</span>
      </div>
      <div
        class="
          flex
          justify-between
          text-white
          rounded-lg
          px-4
          sm:px-6
          py-3
          sm:py-4 sm:text-lg
          shadow-sm
          bg-gradient-to-b
          from-gray-500
          to-gray-600
        "
      >
        <span class="font-bold flex-shrink-0">Staked VITA</span>
        <span><animated-counter :value="parseFloat(stakedVitaBalance)" /> VITA</span>
      </div>
      <div
        v-if="
          parseFloat(stakedVitaBalance) > 0 && stakeUnlockBlock && stakeUnlockBlock > currentBlock
        "
        class="
          flex
          justify-between
          text-white
          rounded-lg
          px-4
          sm:px-6
          py-3
          sm:py-4 sm:text-lg
          shadow-sm
          bg-gradient-to-b
          from-gray-600
          to-gray-700
        "
      >
        <span class="font-bold flex-shrink-0">Stake Unlock Time</span>
        <span>
          in
          {{
            dayjs()
              .add(blockDistanceInSeconds(currentBlock, stakeUnlockBlock), 'seconds')
              .fromNow(true)
          }}
        </span>
      </div>
    </div>

    <staking-box v-if="walletIsConnected" class="mt-4 sm:mt-8" />

    <div class="mt-4">
      <base-button
        v-if="!walletIsConnected"
        type="primary"
        size="lg"
        full-width
        @click="openConnectWalletModal"
        >Please Connect Wallet</base-button
      >
      <base-button v-else size="lg" type="secondary" full-width @click="disconnectWallet"
        >Disconnect Wallet</base-button
      >
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { shortenAddress, blockDistanceInSeconds } from '@/utils'
import BaseButton from '@/components/BaseButton'
import StakingBox from '@/components/StakingBox'
import AnimatedCounter from '@/components/AnimatedCounter'

export default defineComponent({
  components: {
    BaseButton,
    StakingBox,
    AnimatedCounter,
  },
  setup() {
    dayjs.extend(relativeTime)

    const store = useStore()

    function openConnectWalletModal() {
      store.commit('wallet/setConnectWalletModalIsOpen', true)
    }

    async function disconnectWallet() {
      await store.dispatch('wallet/disconnect')
    }

    return {
      loadingUserDetails: computed(() => store.state.wallet.loadingUserDetails),
      walletIsConnected: computed(() => store.state.wallet.isConnected),
      connectedAddress: computed(() => store.state.wallet.connectionInfo.address),
      ethBalance: computed(() => store.state.wallet.ethBalance),
      vitaBalance: computed(() => store.state.wallet.vitaBalance),
      stakedVitaBalance: computed(() => store.state.wallet.stakedVitaBalance),
      currentBlock: computed(() => parseInt(store.state.wallet.currentBlock)),
      stakeUnlockBlock: computed(() => parseInt(store.state.wallet.stakeUnlockBlock)),
      ensName: computed(() => store.state.wallet.ensName),
      openConnectWalletModal,
      disconnectWallet,
      shortenAddress,
      blockDistanceInSeconds,
    }
  },
})
</script>
