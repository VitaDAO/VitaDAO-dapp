<template>
  <p v-if="status === 'error'" class="text-red-500">{{ error.message }}</p>
  <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
    <div
      class="bg-vita-purple text-white rounded-2xl px-8 py-5 flex flex-col justify-between flex-1 gap-3"
    >
      <span v-if="status === 'success'" class="font-medium text-[42px]">{{
        stats.treasury.totalUsdValue
      }}</span>
      <span
        v-else
        class="bg-vita-purple brightness-[0.9] animate-pulse h-[42px] w-[8ch] text-[42px] rounded-sm"
      />
      <span>Treasury value</span>
    </div>
    <div class="bg-vita-sunrise rounded-2xl px-8 py-5 flex flex-col justify-between flex-1 gap-3">
      <span v-if="status === 'success'" class="font-medium text-[42px]">{{
        stats.vita.circulating
      }}</span>
      <span
        v-else
        class="bg-vita-sunrise brightness-[0.9] animate-pulse h-[42px] w-[8ch] text-[42px] rounded-sm"
      />
      <span>Circulating supply</span>
    </div>
    <div class="bg-vita-sunrise rounded-2xl px-8 py-5 flex flex-col justify-between flex-1 gap-3">
      <span v-if="status === 'success'" class="font-medium text-[42px]">{{
        stats.vita.marketCap
      }}</span>
      <span
        v-else
        class="bg-vita-sunrise brightness-[0.9] animate-pulse h-[42px] w-[8ch] text-[42px] rounded-sm"
      />
      <span>VitaDAO market cap</span>
    </div>
    <div class="bg-vita-sunrise rounded-2xl px-8 py-5 flex flex-col justify-between flex-1 gap-3">
      <span v-if="status === 'success'" class="font-medium text-[42px]">{{
        stats.totalInvestment
      }}</span>
      <span
        v-else
        class="bg-vita-sunrise brightness-[0.9] animate-pulse h-[42px] w-[8ch] text-[42px] rounded-sm"
      />
      <span>Invested in research</span>
    </div>
  </div>
</template>

<script setup>
import { getDaoStats } from '@/utils/queries'
import { useQuery } from '@tanstack/vue-query'

const { data: stats, error, status } = useQuery(['getDaoStats'], getDaoStats)
</script>
