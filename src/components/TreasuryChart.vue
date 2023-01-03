<template>
  <div class="rounded-2xl border border-gray-300 p-8 flex flex-col min-h-[400px]">
    <LoadingIndicator v-if="status === 'loading'">Loading chart…</LoadingIndicator>
    <template v-else-if="status === 'success'">
      <span class="flex items-start text-xl gap-1">
        $
        <span v-if="usdTotal" class="font-medium text-[42px] leading-[1em]">{{ usdTotal }}</span>
      </span>
      <span v-if="usdDelta" class="text-[20px] text-vita-purple">{{ usdDelta }}</span>
      <div v-if="Array.isArray(usdValues)" class="flex-1">
        <LineChart :chartData="usdValues" />
      </div>
      <div class="flex gap-2 mt-3">
        <button
          v-for="option in intervals"
          :key="option"
          @click="selectedInterval = option"
          class="text-sm rounded-full border px-3"
          :class="[
            option === selectedInterval
              ? 'border-vita-purple text-white bg-vita-purple'
              : 'border-gray-300',
          ]"
        >
          {{ option }}
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import LineChart from '@/components/LineChart'
import LoadingIndicator from '@/components/LoadingIndicator'
import { useUsdTimeseries } from '@/utils/queries'
import { ref } from 'vue'

const intervals = ['1M', '1Y', 'Max']
const selectedInterval = ref('1Y')

// TODO handle error state
const { data: usdValues, status, usdTotal, usdDelta } = useUsdTimeseries(selectedInterval)
</script>
