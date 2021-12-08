<template>
  <div class="max-w-2xl w-full">
    <hr class="border-black mb-8" />
    <h1 class="font-medium mb-4 text-black text-3xl">Your Wallet</h1>
    <div v-if="walletIsConnected" class="flex flex-col mt-8">
      <div class="flex justify-between text-black py-3 sm:py-4 sm:text-lg border-t border-gray-300">
        <span class="font-medium flex-shrink-0">Your Address</span>
        <span class="font-medium truncate text-vita-purple">{{
          ensName ? ensName : shortenAddress(connectedAddress, 5)
        }}</span>
      </div>
      <div class="flex justify-between text-black py-3 sm:py-4 sm:text-lg border-t border-gray-300">
        <span class="font-medium flex-shrink-0">ETH Balance</span>
        <span class="font-medium truncate text-vita-purple"
          ><animated-counter :decimals="2" :value="parseFloat(ethBalance)" />Ξ</span
        >
      </div>
      <div class="flex justify-between text-black py-3 sm:py-4 sm:text-lg border-t border-gray-300">
        <span class="font-medium flex-shrink-0">VITA Balance</span>
        <span class="font-medium truncate text-vita-purple"
          ><animated-counter :value="parseFloat(vitaBalance)" /> VITA</span
        >
      </div>
      <div
        class="flex justify-between text-black py-3 sm:py-4 sm:text-lg border-t border-gray-300"
        :class="{
          'border-b': !vitaLocked,
        }"
      >
        <span class="font-medium flex-shrink-0">Staked VITA</span>
        <span class="font-medium truncate text-vita-purple"
          ><animated-counter :value="parseFloat(stakedVitaBalance)" /> VITA</span
        >
      </div>
      <div
        v-if="vitaLocked"
        class="flex justify-between text-black py-3 sm:py-4 sm:text-lg border-t border-b border-gray-300"
      >
        <span class="font-medium flex-shrink-0">Stake Unlock Time</span>
        <span class="font-medium truncate text-vita-purple">
          in
          {{
            dayjs()
              .add(blockDistanceInSeconds(currentBlock, stakeUnlockBlock), 'seconds')
              .fromNow(true)
          }}
        </span>
      </div>
    </div>

    <staking-box v-if="walletIsConnected" class="mt-4 sm:mt-14" />

    <div>
      <base-button
        v-if="!walletIsConnected"
        type="primary"
        size="lg"
        full-width
        @click="openConnectWalletModal"
        >Please Connect Wallet</base-button
      >
      <div v-else class="mt-14">
        <hr class="border-black mb-4" />
        <base-button class="float-right" @click="disconnectWallet">Disconnect Wallet</base-button>
      </div>
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

    const stakedVitaBalance = computed(function () {
      return store.state.wallet.stakedVitaBalance
    })

    const stakeUnlockBlock = computed(function () {
      return parseInt(store.state.wallet.stakeUnlockBlock)
    })

    const currentBlock = computed(function () {
      return parseInt(store.state.wallet.currentBlock)
    })

    const vitaLocked = computed(function () {
      return (
        parseFloat(stakedVitaBalance.value) > 0 &&
        stakeUnlockBlock.value &&
        stakeUnlockBlock.value > currentBlock.value
      )
    })

    return {
      loadingUserDetails: computed(() => store.state.wallet.loadingUserDetails),
      walletIsConnected: computed(() => store.state.wallet.isConnected),
      connectedAddress: computed(() => store.state.wallet.connectionInfo.address),
      ethBalance: computed(() => store.state.wallet.ethBalance),
      vitaBalance: computed(() => store.state.wallet.vitaBalance),
      ensName: computed(() => store.state.wallet.ensName),
      stakedVitaBalance,
      currentBlock,
      stakeUnlockBlock,
      vitaLocked,
      openConnectWalletModal,
      disconnectWallet,
      shortenAddress,
      blockDistanceInSeconds,
      dayjs,
    }
  },
})
</script>
