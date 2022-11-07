<template>
  <div class="rounded-2xl border border-gray-300 p-6">
    <h3 class="text-lg mb-5">All investments</h3>
    <ul v-if="status === 'loading'" class="space-y-5">
      <li v-for="item in [1, 2, 3, 4, 5]" :key="item" class="flex items-center gap-3 animate-pulse">
        <div class="rounded-full h-[40px] w-[40px] bg-gray-300" />
        <div class="flex-grow flex flex-col gap-1">
          <div class="flex gap-2 justify-between">
            <span class="bg-gray-300 h-4 w-32 rounded-sm" />
            <span class="bg-gray-300 h-4 w-32 rounded-sm" />
          </div>
          <div class="flex gap-2 justify-between">
            <span class="bg-gray-300 h-4 w-44 rounded-sm" />
            <span class="bg-gray-300 h-4 w-44 rounded-sm" />
          </div>
        </div>
      </li>
    </ul>
    <p v-else-if="status === 'error'" class="text-red-500">{{ error.message }}</p>
    <ul v-else-if="status === 'success'" class="space-y-5 text-[17px]">
      <li v-for="token in tokens" :key="token.name">
        <div class="flex items-center gap-3">
          <div class="rounded-full h-[40px] w-[40px] bg-gray-300" />
          <div class="flex-grow">
            <div class="flex gap-2 font-medium items-center">
              <span>{{ token.name }}</span>
              <span class="text-[15px] px-1 rounded-lg bg-gray-200 leading-5">{{
                token.percent
              }}</span>
              <span class="flex-grow text-right">{{ token.value }}</span>
            </div>
            <div class="flex gap-2">
              <span class="text-gray-500">{{ token.treasury }}</span>
              <span
                class="flex-grow text-right"
                :class="[token.stats[0] === '+' ? 'text-green-500' : 'text-red-500']"
                >{{ token.stats }}</span
              >
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { getTreasuryTokens } from '@/utils/queries'
import { useQuery } from '@tanstack/vue-query'

const { data: tokens, error, status } = useQuery(['getTreasuryTokens'], getTreasuryTokens)
</script>
