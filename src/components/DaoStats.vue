<template>
  <p v-if="statsStatus === 'error'" class="text-red-500">{{ statsError.message }}</p>
  <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 auto-rows-[160px]">
    <div
      class="bg-vita-purple text-white rounded-2xl px-8 py-5 flex flex-col justify-between flex-1"
    >
      <span class="flex items-start text-xl gap-1">
        $
        <span v-if="statsStatus === 'success'" class="font-medium text-[42px] leading-[1em]">{{
          statsData.vita.price
        }}</span>
        <span
          v-else
          class="bg-vita-purple brightness-[0.9] animate-pulse h-[42px] w-[8ch] text-[42px] rounded-sm"
        />
      </span>
      <span>$VITA price</span>
    </div>
    <div class="bg-vita-sunrise rounded-2xl px-8 py-5 flex flex-col justify-between flex-1 gap-3">
      <span v-if="statsStatus === 'success'" class="font-medium text-[42px] leading-[1em]">{{
        statsData.vita.circulating
      }}</span>
      <span
        v-else
        class="bg-vita-sunrise brightness-[0.9] animate-pulse h-[42px] w-[8ch] text-[42px] rounded-sm"
      />
      <span>$VITA circulating supply</span>
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
      <span>$VITA market cap</span>
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
import { useDaoStats } from '@/utils/queries'

const { data: statsData, error: statsError, status: statsStatus } = useDaoStats()
</script>
