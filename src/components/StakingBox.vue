<template>
  <div class="w-full border border-gray-300 rounded-xl px-7 py-8">
    <tab-group>
      <tab-list class="bg-gray-100 rounded-full border border-gray-300 flex space-x-1">
        <tab v-slot="{ selected }" as="template">
          <button
            :class="[
              'w-full text-lg py-3 leading-5 font-medium rounded-full',
              selected
                ? 'text-vita-purple border border-vita-purple bg-white'
                : 'text-gray-600 hover:text-gray-800',
            ]"
          >
            Unstake
          </button>
        </tab>
        <tab v-slot="{ selected }" as="template">
          <button
            :class="[
              'w-full text-lg py-3 leading-5 font-medium rounded-full',
              selected
                ? 'text-vita-purple border border-vita-purple bg-white'
                : 'text-gray-600 hover:text-gray-800',
            ]"
          >
            Stake
          </button>
        </tab>
      </tab-list>

      <tab-panels class="mt-7">
        <tab-panel :class="['bg-white rounded-xl']">
          <transition name="fade" mode="out-in">
            <div v-if="!vitaIsApproved" key="approveFirst">
              <notice-box v-if="vitaBalance == 0" class="mb-4"
                ><p>
                  You have to enable the VITA token in order to interact with the DAO contract.
                </p></notice-box
              >
              <base-button
                type="teal"
                full-width
                :disabled="approvingVita"
                :loading="approvingVita"
                @click="approveVitaToken"
              >
                Enable VITA Token
              </base-button>
            </div>
            <div v-else key="unstaking">
              <notice-box v-if="stakedVitaBalance == 0" class="mb-4"
                ><p>You don't have any staked VITA at the moment.</p></notice-box
              >
              <div class="mb-6">
                <label class="block font-semibold text-black text-sm">Amount</label>
                <div class="flex mt-1 rounded-xl">
                  <div class="w-full relative">
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
                      class="block border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-vita-purple rounded-xl text-sm sm:text-base w-full py-2.5"
                      @keypress="validateNumber"
                    />
                    <button
                      @click="setUnstakingMax"
                      class="bg-vita-sunrise px-3 py-1 absolute right-2 top-2 uppercase rounded-lg text-sm font-medium"
                    >
                      Max
                    </button>
                  </div>
                </div>
              </div>
              <base-button
                type="secondary"
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
        <tab-panel :class="['bg-white rounded-xl']">
          <transition name="fade" mode="out-in">
            <notice-box class="mb-4"
              ><p>
                Staking is not required to vote anymore, because VitaDAO moved to gasless voting
                with Snapshot. See a list of proposals
                <router-link class="underline" to="/proposals">here</router-link>.
              </p></notice-box
            >
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
import NoticeBox from '@/components/NoticeBox'

export default {
  components: {
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    BaseButton,
    NoticeBox,
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
