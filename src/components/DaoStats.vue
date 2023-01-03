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
        <span v-if="usdDelta" class="text-[20px]"
          >{{ usdDelta }} <span class="opacity-50">weekly</span></span
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
import { getDaoStats, useUsdTimeseries } from '@/utils/queries'
import { useQuery } from '@tanstack/vue-query'
import { ref } from 'vue'

const {
  data: statsData,
  error: statsError,
  status: statsStatus,
} = useQuery(['getDaoStats'], getDaoStats)

const interval = ref('1W')
const { usdTotal, usdDelta } = useUsdTimeseries(interval)
</script>
