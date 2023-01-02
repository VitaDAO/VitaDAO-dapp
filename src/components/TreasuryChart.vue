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
          v-for="option in timeRanges"
          :key="option"
          @click="selectedTimeRange = option"
          class="text-sm rounded-full border px-3"
          :class="[
            option === selectedTimeRange
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
import { getTreasuryUsdTimeseries } from '@/utils/queries'
import { useQuery } from '@tanstack/vue-query'
import { computed, ref } from 'vue'

const timeRanges = ['1M', '1Y', 'Max']
const selectedTimeRange = ref('1Y')

// TODO handle error state
const { data: usdValues, status } = useQuery(['getTreasuryUsdTimeseries', selectedTimeRange], () =>
  getTreasuryUsdTimeseries(selectedTimeRange.value),
)

const usdTotal = computed(() =>
  Array.isArray(usdValues.value)
    ? usdValues.value.at(-1).balance?.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    : undefined,
)

const usdDelta = computed(() => {
  if (Array.isArray(usdValues.value)) {
    const start = usdValues.value.at(0).balance
    const end = usdValues.value.at(-1).balance
    const delta = end - start
    const deltaPercent = (delta / end) * 100
    const sign = delta > 0 ? '+' : ''
    return `${sign}${Number(deltaPercent.toPrecision(2))}% ($${Math.abs(delta).toLocaleString(
      undefined,
      {
        maximumFractionDigits: 0,
      },
    )})`
  }
  return undefined
})
</script>
