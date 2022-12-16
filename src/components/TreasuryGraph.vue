<template>
  <div class="rounded-2xl border border-gray-300 p-8 flex flex-col gap-3 min-h-[400px]">
    <LoadingIndicator v-if="status === 'loading'">Loading chart…</LoadingIndicator>
    <template v-else-if="status === 'success'">
      <span v-if="usdTotal" class="flex items-start text-xl gap-1">
        $
        <span class="font-medium text-[42px] leading-[1em]">
          {{ usdTotal }}
        </span>
      </span>
      <div v-if="Array.isArray(usdValues)" class="flex-1">
        <LineChart :chartData="usdValues" />
      </div>
      <div class="flex gap-2">
        <button
          v-for="option in timeRanges"
          :key="option"
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

const selectedTimeRange = ref('1Y')
const timeRanges = ['1M', '1Y', 'Max']

// TODO handle error state
const { data, status } = useQuery(['getTreasuryUsdTimeseries'], getTreasuryUsdTimeseries)

const usdValues = computed(() => (Array.isArray(data.value) ? data.value.slice(-365) : undefined))

const usdTotal = computed(() =>
  Array.isArray(data.value)
    ? data.value.at(-1).balance?.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    : undefined,
)
</script>
