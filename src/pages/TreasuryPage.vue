<template>
  <div class="w-full">
    <hr class="border-black mb-8" />
    <h2 class="font-medium mb-1.5 sm:mb-4 text-black text-2xl sm:text-3xl">Treasury</h2>
    <div class="grid grid-cols-1 gap-6">
      <TreasuryChart />
      <TreasuryList :onlyTopAssets="false" />
    </div>
  </div>
</template>

<script setup>
import TreasuryChart from '@/components/TreasuryChart.vue'
import TreasuryList from '@/components/TreasuryList.vue'
</script>
