<template>
  <p v-if="statsStatus === 'error'" class="text-red-500">{{ statsError.message }}</p>
  <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 auto-rows-[160px]">
    <div
      class="bg-vita-purple text-white rounded-2xl px-8 py-5 flex flex-col justify-between flex-1"
    >
      <div>
        <span class="flex items-start text-xl gap-1">
          $
          <span v-if="usdTotal" class="font-medium text-[42px] leading-[1em]">{{ usdTotal }}</span>
          <span
            v-else
            class="bg-vita-purple brightness-[0.9] animate-pulse h-[42px] w-[8ch] text-[42px] rounded-sm"
          />
        </span>
        <span v-if="usdWeekDelta" class="text-[20px]"
          >{{ usdWeekDelta }} <span class="opacity-50">weekly</span></span
        >
        <span
          v-else
          class="bg-vita-purple brightness-[0.9] animate-pulse h-[20px] w-[8ch] text-[20px] rounded-sm"
        />
      </div>
      <span>Treasury value</span>
    </div>
    <div class="bg-vita-sunrise rounded-2xl px-8 py-5 flex flex-col justify-between flex-1 gap-3">
      <span v-if="statsStatus === 'success'" class="font-medium text-[42px] leading-[1em]">{{
        statsData.vita.circulating
      }}</span>
      <span
        v-else
        class="bg-vita-sunrise brightness-[0.9] animate-pulse h-[42px] w-[8ch] text-[42px] rounded-sm"
      />
      <span>Circulating supply</span>
    </div>
    <div class="bg-vita-sunrise rounded-2xl px-8 py-5 flex flex-col justify-between flex-1 gap-3">
      <span class="flex items-start text-xl gap-1">
        $
        <span v-if="statsStatus === 'success'" class="font-medium text-[42px] leading-[1em]">{{
          statsData.vita.marketCap
        }}</span>
        <span
          v-else
          class="bg-vita-sunrise brightness-[0.9] animate-pulse h-[42px] w-[8ch] text-[42px] rounded-sm"
        />
      </span>
      <span>VitaDAO market cap</span>
    </div>
    <div class="bg-vita-sunrise rounded-2xl px-8 py-5 flex flex-col justify-between flex-1 gap-3">
      <span class="flex items-start text-xl gap-1">
        $
        <span v-if="statsStatus === 'success'" class="font-medium text-[42px] leading-[1em]">{{
          statsData.totalInvestment
        }}</span>
        <span
          v-else
          class="bg-vita-sunrise brightness-[0.9] animate-pulse h-[42px] w-[8ch] text-[42px] rounded-sm"
        />
      </span>
      <span>Invested in research</span>
    </div>
  </div>
</template>

<script setup>
import { getDaoStats, getTreasuryUsdTimeseries } from '@/utils/queries'
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'

const {
  data: statsData,
  error: statsError,
  status: statsStatus,
} = useQuery(['getDaoStats'], getDaoStats)
const {
  data: timeseriesData,
  error: timeseriesError,
  status: timeseriesStatus,
} = useQuery(['getTreasuryUsdTimeseries', '1W'], () => getTreasuryUsdTimeseries('1W'))

const usdTotal = computed(() =>
  Array.isArray(timeseriesData.value)
    ? timeseriesData.value.at(-1).balance?.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    : undefined,
)

const usdWeekDelta = computed(() => {
  if (Array.isArray(timeseriesData.value)) {
    const lastWeek = timeseriesData.value.at(0).balance
    const today = timeseriesData.value.at(-1).balance
    const delta = today - lastWeek
    const deltaPercent = (delta / today) * 100
    const sign = delta > 0 ? '+' : '-'
    return `${sign}${Number(deltaPercent.toPrecision(2))}% ($${delta.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    })})`
  }
  return undefined
})
</script>
