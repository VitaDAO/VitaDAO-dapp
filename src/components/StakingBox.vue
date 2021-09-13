<template>
  <div class="w-full">
    <tab-group>
      <tab-list class="bg-gray-300 flex p-1 rounded-xl space-x-1">
        <tab v-slot="{ selected }" as="template">
          <button
            :class="[
              'w-full py-2.5 text-sm leading-5 font-medium text-gray-700 rounded-lg',
              selected ? 'bg-white shadow' : 'text-white hover:bg-white/[0.12] hover:text-gray-800',
            ]"
          >
            Stake
          </button>
        </tab>
        <tab v-slot="{ selected }" as="template">
          <button
            :class="[
              'w-full py-2.5 text-sm leading-5 font-medium text-gray-700 rounded-lg',
              selected ? 'bg-white shadow' : 'text-white hover:bg-white/[0.12] hover:text-gray-800',
            ]"
          >
            Unstake
          </button>
        </tab>
      </tab-list>

      <tab-panels class="mt-4">
        <tab-panel :class="['bg-white rounded-xl px-6 py-8 shadow-md']">
          <transition name="fade" mode="out-in">
            <div v-if="!vitaIsApproved" key="approveFirst">
              <warning-box v-if="vitaBalance == 0" class="mb-4"
                ><p>
                  You have to enable the VITA token to be able to interact with the VITA DAO
                  contract
                </p></warning-box
              >
              <base-button
                full-width
                :disabled="approvingVita"
                :loading="approvingVita"
                @click="approveVitaToken"
              >
                Enable VITA Token
              </base-button>
            </div>
            <div v-else key="staking">
              <warning-box v-if="vitaBalance == 0" class="mb-4"
                ><p>
                  Your VITA balance is zero at the moment. Please get or unstake some VITA first.
                </p></warning-box
              >
              <div class="mb-2">
                <label class="block font-medium text-gray-700 text-sm">Amount</label>
                <div class="flex mt-1 rounded-md shadow-sm">
                  <div class="flex flex-grow focus-within:z-10 items-stretch relative">
                    <input
                      v-model="stakingAmount"
                      placeholder="0.0"
                      min="0"
                      minlength="1"
                      maxlength="79"
                      spellcheck="false"
                      autocomplete="off"
                      autocorrect="off"
                      inputmode="decimal"
                      pattern="^[0-9]*[.]?[0-9]*$"
                      type="text"
                      class="
                        block
                        border-gray-300
                        focus:border-gray-400 focus:ring-gray-400
                        rounded-l-md rounded-none
                        sm:text-sm
                        w-full
                      "
                      @keypress="validateNumber"
                    />
                  </div>
                  <button
                    class="
                      -ml-px
                      bg-gray-50
                      border border-gray-300
                      focus:border-gray-400 focus:outline-none focus:ring-1 focus:border-gray-400
                      font-medium
                      hover:bg-gray-100
                      inline-flex
                      items-center
                      px-4
                      py-2
                      relative
                      rounded-r-md
                      space-x-2
                      text-gray-700 text-sm
                    "
                    @click="setStakingMax"
                  >
                    <span class="text-xs">MAX</span>
                  </button>
                </div>
              </div>
              <base-button
                type="primary"
                full-width
                :loading="stakingVita"
                :disabled="stakingAmount == 0 || stakingVita"
                @click="stakeVita"
              >
                Stake VITA
              </base-button>
            </div>
          </transition>
        </tab-panel>
        <tab-panel :class="['bg-white rounded-xl px-6 py-8 shadow-md']">
          <transition name="fade" mode="out-in">
            <div v-if="!vitaIsApproved" key="approveFirst">
              <warning-box v-if="vitaBalance == 0" class="mb-4"
                ><p>
                  You have to enable the VITA token to be able to interact with the VITA DAO
                  contract
                </p></warning-box
              >
              <base-button
                full-width
                :disabled="approvingVita"
                :loading="approvingVita"
                @click="approveVitaToken"
              >
                Enable VITA Token
              </base-button>
            </div>
            <div v-else key="unstaking">
              <warning-box v-if="stakedVitaBalance == 0" class="mb-4"
                ><p>You haven't staked any VITA at the moment.</p></warning-box
              >
              <div class="mb-2">
                <label class="block font-medium text-gray-700 text-sm">Amount</label>
                <div class="flex mt-1 rounded-md shadow-sm">
                  <div class="flex flex-grow focus-within:z-10 items-stretch relative">
                    <input
                      v-model="unstakingAmount"
                      placeholder="0.0"
                      min="0"
                      minlength="1"
                      maxlength="79"
                      spellcheck="false"
                      autocomplete="off"
                      autocorrect="off"
                      inputmode="decimal"
                      pattern="^[0-9]*[.]?[0-9]*$"
                      type="text"
                      class="
                        block
                        border-gray-300
                        focus:border-gray-400 focus:ring-gray-400
                        rounded-l-md rounded-none
                        sm:text-sm
                        w-full
                      "
                      @keypress="validateNumber"
                    />
                  </div>
                  <button
                    class="
                      -ml-px
                      bg-gray-50
                      border border-gray-300
                      focus:border-gray-400 focus:outline-none focus:ring-1 focus:border-gray-400
                      font-medium
                      hover:bg-gray-100
                      inline-flex
                      items-center
                      px-4
                      py-2
                      relative
                      rounded-r-md
                      space-x-2
                      text-gray-700 text-sm
                    "
                    @click="setUnstakingMax"
                  >
                    <span>MAX</span>
                  </button>
                </div>
              </div>
              <base-button
                type="primary"
                full-width
                :loading="unstakingVita"
                :disabled="unstakingAmount == 0 || unstakingVita"
                @click="unstakeVita"
              >
                Unstake VITA
              </base-button>
            </div>
          </transition>
        </tab-panel>
      </tab-panels>
    </tab-group>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import BaseButton from '@/components/BaseButton'
import WarningBox from '@/components/WarningBox'

export default {
  components: {
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    BaseButton,
    WarningBox,
  },
  setup() {
    const store = useStore()
    const stakingAmount = ref(0.0)
    const unstakingAmount = ref(0.0)

    async function setStakingMax() {
      stakingAmount.value = store.state.wallet.vitaBalance
    }

    async function setUnstakingMax() {
      unstakingAmount.value = store.state.wallet.stakedVitaBalance
    }

    async function approveVitaToken() {
      try {
        await store.dispatch('wallet/approveVitaToken')
      } catch (e) {
        store.commit('wallet/setApprovingVita', false)
        console.log('user rejected or other error', e)
      }
    }

    async function stakeVita() {
      try {
        await store.dispatch('wallet/stakeVitaTokens', stakingAmount.value)
      } catch (e) {
        store.commit('wallet/setStakingVita', false)
        console.log('user rejected or other error', e)
      }
    }

    async function unstakeVita() {
      try {
        await store.dispatch('wallet/unstakeVitaTokens', unstakingAmount.value)
      } catch (e) {
        store.commit('wallet/setUnstakingVita', false)
        console.log('user rejected or other error', e)
      }
    }

    function validateNumber(event) {
      let charCode = event.keyCode

      if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
        event.preventDefault()
      }
    }

    return {
      vitaIsApproved: computed(() => store.state.wallet.vitaIsApproved),
      approvingVita: computed(() => store.state.wallet.approvingVita),
      vitaBalance: computed(() => store.state.wallet.vitaBalance),
      stakingVita: computed(() => store.state.wallet.stakingVita),
      unstakingVita: computed(() => store.state.wallet.unstakingVita),
      stakedVitaBalance: computed(() => store.state.wallet.stakedVitaBalance),
      stakeUnlockBlock: computed(() => parseInt(store.state.wallet.stakeUnlockBlock)),
      approveVitaToken,
      setStakingMax,
      stakingAmount,
      stakeVita,
      setUnstakingMax,
      unstakingAmount,
      unstakeVita,
      validateNumber,
    }
  },
}
</script>
