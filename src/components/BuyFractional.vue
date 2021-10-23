<template>
  <div class="mt-4">
    <div class="bg-white rounded-xl px-6 py-6 shadow-md">
      <h2 class="font-bold mb-2 text-black text-xl">Exchange</h2>
      <div class="mb-2">
        <div>
          <div class="flex flex-row justify-between">
            <label class="block font-medium text-gray-700 text-sm">Pay</label>
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
        </div>
        <div class="flex flex-row justify-center mt-2 mb-2">
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
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
        <div>
          <div class="flex flex-row justify-between">
            <label class="block font-medium text-gray-700 text-sm">Receive</label>
            <p class="font-medium text-black-700 text-sm">
              <span class="uppercase">Balance:</span> 0 FRACTIONAL
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
                rounded-r-md
                space-x-2
                text-gray-700 text-sm
              "
            >
              <span class="text-xs">MAX</span>
            </button>
          </div>
        </div>
        <div class="flex flex-col mt-8">
          <div class="flex flex-row">
            <p>Estimated fees</p>
            <div class="flex-grow border-b mr-2 ml-2" />
            <p>29.14$</p>
          </div>
          <div class="flex flex-row mt-2">
            <p>Min. received</p>
            <div class="flex-grow border-b mr-2 ml-2" />
            <p>351,399 FRACTIONAL</p>
          </div>
          <div class="flex flex-row mt-2">
            <p>Implied valuation</p>
            <div class="flex-grow border-b mr-2 ml-2" />
            <p>48,056.217 ETH</p>
          </div>
        </div>
        <base-button type="primary" full-width class="mt-8">Review My Order</base-button>
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
