<template>
  <div v-if="props.asset" class="text-xs sm:text-sm">
    <div class="border-t flex justify-between items-start">
      <div class="flex gap-3 items-start px-2 py-3">
        <MediaElement
          v-if="props.asset.mediaUrl"
          :src="props.asset.mediaUrl"
          alt=""
          class="h-5 w-5 sm:h-9 sm:w-9 object-cover flex-shrink-0"
        />
        <div
          v-else
          class="h-5 w-5 sm:h-9 sm:w-9 rounded-full flex-shrink-0 flex items-center justify-center"
          :style="`background-color: ${stringToHsl(props.asset.label)};`"
        >
          {{ initials(props.asset.label, isOverSmBreakpoint ? 3 : 1) }}
        </div>
        <div>
          <div class="font-bold">{{ props.asset.label }}</div>
          <span v-if="props.asset.secondaryLabel">
            {{ props.asset.secondaryLabel }}
          </span>
        </div>
      </div>
      <div class="px-2 py-3 text-right flex flex-col flex-shrink-0">
        <span>${{ formatNumber(props.asset.value, 0) }}</span>
        <span v-if="props.asset.balance">{{
          `${formatNumber(props.asset.balance)} ${props.asset.symbol}`
        }}</span>
        <span v-else-if="props.asset.moleculesBalance"
          >{{ `${formatNumber(props.asset.moleculesBalance)} ${props.asset.moleculesSymbol}` }}
        </span>
      </div>
    </div>
  </div>
  <!-- TODO <div v-else>Loader squeleton</div> -->
</template>

<script setup>
import { formatNumber } from '@/utils'
import { useMediaQuery } from '@vueuse/core'
import { defineProps } from 'vue'
import MediaElement from './MediaElement'

const props = defineProps({
  asset: {
    type: Object,
    required: false,
  },
})

const isOverSmBreakpoint = useMediaQuery('(min-width: 640px)')

function initials(name, maxInitials = 3) {
  return name
    .split(/\s|\./)
    .slice(0, maxInitials)
    .map((term) => term[0])
    .join('')
    .toUpperCase()
}

function stringToHsl(s) {
  const hash = s.split('').reduce((acc, cur) => cur.codePointAt(0) + ((acc << 5) - acc), 0)
  const h = hash % 360
  return `hsl(${h} 70% 85%)`
}
</script>
