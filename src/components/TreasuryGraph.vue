<template>
  <div class="rounded-2xl border border-gray-300 p-8 max-h-[433px] flex flex-col gap-3">
    <span v-if="usdTotal" class="flex items-start text-xl gap-1">
      $
      <span class="font-medium text-[42px] leading-[1em]">
        {{ usdTotal }}
      </span>
    </span>
    <svg v-show="usdValues" ref="chart" height="100%" width="100%">
      <defs>
        <linearGradient id="gradient" gradientTransform="rotate(90)">
          <stop offset="0%" stop-color="#6256ec44" />
          <stop offset="50%" stop-color="transparent" />
        </linearGradient>
      </defs>
      <path :d="areaPath" fill="url('#gradient')" />
      <path :d="linePath" stroke="#6256ec" stroke-width="2" fill="none" />
    </svg>
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
  </div>
</template>

<script setup>
import { getTreasuryUsdTimeseries } from '@/utils/queries'
import { useQuery } from '@tanstack/vue-query'
import { extent } from 'd3-array'
import { scaleLinear, scaleTime } from 'd3-scale'
import { area } from 'd3-shape'
import { computed, onMounted, ref } from 'vue'

const selectedTimeRange = ref('1Y')
const timeRanges = ['1M', '1Y', 'Max']

const { data, error, status } = useQuery(['getTreasuryUsdTimeseries'], getTreasuryUsdTimeseries)

const usdValues = computed(() => (Array.isArray(data.value) ? data.value.slice(-365) : undefined))

const usdTotal = computed(() =>
  Array.isArray(data.value)
    ? data.value.at(-1).balance?.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    : undefined,
)

const areaPath = ref()
const linePath = ref()
const parse = (date) => Date.parse(date)

const resizeObserver = new ResizeObserver((entries) => {
  if (Array.isArray(usdValues.value)) {
    const { inlineSize: width, blockSize: height } = entries[0].contentBoxSize[0]

    const x = scaleTime()
      .domain(extent(usdValues.value, (d) => parse(d.timestamp)))
      .rangeRound([2, width - 2])

    const y = scaleLinear()
      .domain(extent(usdValues.value, (d) => d.balance))
      .rangeRound([height - 5, 5])

    const areaFn = area()
      .x((d) => x(parse(d.timestamp)))
      .y0(() => height)
      .y1((d) => y(d.balance))

    areaPath.value = areaFn(usdValues.value)

    const lineFn = areaFn.lineY1()

    linePath.value = lineFn(usdValues.value)
  }
})

const chart = ref()

onMounted(() => {
  resizeObserver.observe(chart.value)
})
</script>
