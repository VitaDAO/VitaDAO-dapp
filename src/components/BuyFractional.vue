<template>
  <div class="mt-4">
    <div class="bg-white rounded-xl px-6 py-6 shadow-md">
      <div class="flex flex-row justify-between">
        <h2 class="font-bold mb-2 text-black text-xl">Exchange</h2>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
      </div>
      <div class="mb-2">
        <div class="border border-black rounded-xl shadow-lg p-4">
          <div class="flex flex-row justify-between">
            <label class="block font-medium text-gray-700 text-sm">From</label>
            <p class="font-medium text-black-700 text-sm">
              <span class="uppercase">Balance:</span> 0 ETH
            </p>
          </div>
          <div class="flex mt-1 rounded-md shadow-sm">
            <div class="flex flex-grow focus-within:z-10 items-stretch relative">
              <input
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
                space-x-2
                text-gray-700 text-sm
              "
            >
              <span class="text-xs">MAX</span>
            </button>
            <div class="inset-y-0 right-0 flex items-center">
              <label for="currency" class="sr-only">Currency</label>
              <select
                id="currency"
                name="currency"
                class="
                  bg-gray-50
                  border border-gray-300
                  focus:border-gray-400 focus:outline-none focus-ring-1 focus-border-gray-400
                  h-full
                  py-0
                  pl-2
                  pr-7
                  border-transparent
                  bg-transparent
                  text-gray-500
                  sm:text-sm
                  rounded-r-md
                "
              >
                <option>ETH</option>
                <option>...</option>
                <option>...</option>
              </select>
            </div>
          </div>
          <div class="flex justify-start mt-2 ml-2">
            <p class="text-sm text-gray-500">$424.54</p>
          </div>
        </div>
        <div class="flex flex-row justify-between items-center mt-2 mb-2 ml-4">
          <div class="border border-black rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
          </div>
          <div class="border-0 rounded-xl shadow-md pt-2 pb-2 pr-16 pl-16 text-xs mr-4">
            1 ETH = 330,212 VITA
          </div>
        </div>
        <div class="border border-black rounded-xl shadow-lg p-4">
          <div class="flex flex-row justify-between">
            <label class="block font-medium text-gray-700 text-sm">To</label>
            <p class="font-medium text-gray-500 text-sm"><span class="">Balance:</span> 0 MSK</p>
          </div>
          <div class="flex mt-1">
            <div class="flex flex-grow focus-within:z-10 items-stretch relative text-black text-lg">
              <input
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
                  border-0
                  rounded-l-md rounded-none
                  focus:outline-none focus-ring-1 focus-border-gray-400
                  text-2xl
                  sm:text-sm
                  w-full
                  pt-4
                  pb-4
                "
              />
              <span
                class="
                  flex
                  items-center
                  bg-gray-50
                  border-0
                  h-full
                  py-0
                  pl-2
                  pr-7
                  border-transparent
                  bg-transparent
                  sm:text-sm
                  rounded-r-md
                "
              >
                <img class="w-6 h-6 mr-2" src="../assets/ethereum-eth.svg" />
                MSK
              </span>
            </div>
          </div>
          <div class="flex justify-start mt-2">
            <p class="text-sm text-gray-500">$424.54</p>
          </div>
          <div class="text-red-500 mt-2">Insufficient balance</div>
        </div>
        <base-button type="primary" full-width class="mt-8">Review My Order</base-button>
        <div class="mt-2 flex flex-row justify-center">
          <span class="text-xs text-gray-400"> For advanced trading features you can visit </span>
          &nbsp;
          <a class="text-xs text-gray-400 underline" href="https://trade.vitadao.com"
            >https://trade.vitadao.com</a
          >
        </div>
        <div class="flex flex-col mt-8 text-sm text-gray-400">
          <div class="flex flex-row">
            <p>Estimated fees</p>
            <div class="flex-grow border-b mr-2 ml-2" />
            <p>$29.14</p>
          </div>
          <div class="flex flex-row mt-2">
            <p>Min. received</p>
            <div class="flex-grow border-b mr-2 ml-2" />
            <p>351,399 MSK</p>
          </div>
          <div class="flex flex-row mt-2">
            <p>Implied valuation</p>
            <div class="flex-grow border-b mr-2 ml-2" />
            <p>48,056.217 ETH</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import BaseButton from '@/components/BaseButton'

export default defineComponent({
  components: { BaseButton },
  props: {
    ipnft: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {}
  },
})
</script>
