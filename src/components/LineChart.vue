<template>
  <!-- Attaching a resize observer to an SVG element doesn't seem to work as
expected on Chrome, so adding wrapper instead. Ugh. -->
  <div ref="wrapper" class="h-full w-full">
    <svg
      height="100%"
      width="100%"
      @mouseenter="handleEnter"
      @mouseleave="handleLeave"
      @mousemove="handleMove"
    >
      <defs>
        <linearGradient id="gradient" gradientTransform="rotate(90)">
          <stop offset="0%" stop-color="#6256ec44" />
          <stop offset="50%" stop-color="transparent" />
        </linearGradient>
      </defs>
      <path :d="areaPath" fill="url('#gradient')" />
      <path :d="linePath" stroke="#6256ec" stroke-width="2" fill="none" />
      <text x="98%" y="60" text-anchor="end" class="fill-current text-gray-400">
        {{ maxBalance }}
      </text>
      <text x="98%" y="98%" text-anchor="end" class="fill-current text-gray-400">
        {{ minBalance }}
      </text>
      <g v-if="isCursorVisible">
        <circle
          :cx="cursorX"
          :cy="cursorY"
          fill="#6256ecaa"
          stroke="#6256ec"
          stroke-width="2"
          r="5"
        />
        <text v-bind="cursorLabelAttr" class="font-bold text-xl">
          {{ cursorBalance }}
        </text>
        <text v-bind="cursorLabelAttr" dy="20">{{ cursorDate }}</text>
        <line :x1="cursorX" y1="0" :x2="cursorX" y2="100%" stroke="#6256ec" stroke-dasharray="4" />
        <line x1="0" :y1="cursorY" x2="100%" :y2="cursorY" stroke="#6256ec" stroke-dasharray="4" />
      </g>
    </svg>
  </div>
</template>

<script setup>
import { bisector, extent, max, min } from 'd3-array'
import { scaleLinear, scaleTime } from 'd3-scale'
import { pointer } from 'd3-selection'
import { area } from 'd3-shape'
import { computed, defineProps, onMounted, ref } from 'vue'

const props = defineProps({
  chartData: {
    // TODO Can this type check be more tight? I'd like to specify array of
    // objects with timestamp and value properties. We could provide a custom
    // *runtime* validator, but let's please start using TypeScript instead!
    type: Array,
    required: true,
  },
})

const areaPath = ref()
const linePath = ref()
var bisect = bisector(function (d) {
  return Date.parse(d.timestamp)
}).right

const isCursorVisible = ref(false)

const handleEnter = () => {
  isCursorVisible.value = true
}

const handleLeave = () => {
  isCursorVisible.value = false
}

const cursorX = ref(-20)
const cursorY = ref(-20)
const cursorBalance = ref(0)
const cursorDate = ref(0)
const cursorAnchor = ref('end')
const cursorLabelAttr = computed(() => ({
  x: cursorAnchor.value === 'start' ? cursorX.value + 5 : cursorX.value - 5,
  y: 20,
  'text-anchor': cursorAnchor.value,
}))
const maxBalance = computed(
  () =>
    `$${formatUsd(
      max(props.chartData, (d) => d.balance),
      0,
    )}`,
)
const minBalance = computed(
  () =>
    `$${formatUsd(
      min(props.chartData, (d) => d.balance),
      0,
    )}`,
)

function formatUsd(n, decimals = 2) {
  return n?.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

function formatDate(d) {
  return new Date(d).toLocaleString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

const handleMove = (e) => {
  const idx = bisect(props.chartData, x.value.invert(pointer(e)[0]))
  const datum = props.chartData[idx]
  if (datum) {
    cursorX.value = x.value(Date.parse(datum.timestamp))
    cursorY.value = y.value(datum.balance)
    cursorBalance.value = `$${formatUsd(datum.balance, 0)}`
    cursorDate.value = formatDate(datum.timestamp)
    cursorAnchor.value = idx > props.chartData.length / 2 ? 'end' : 'start'
  }
}

const x = ref()
const y = ref()

const resizeObserver = new ResizeObserver((entries) => {
  if (Array.isArray(props.chartData)) {
    const { blockSize: height, inlineSize: width } = entries[0].contentBoxSize[0]

    x.value = scaleTime()
      .domain(extent(props.chartData, (d) => Date.parse(d.timestamp)))
      .rangeRound([2, width - 2])

    y.value = scaleLinear()
      .domain(extent(props.chartData, (d) => d.balance))
      .rangeRound([height - 30, 70])

    const areaFn = area()
      .x((d) => x.value(Date.parse(d.timestamp)))
      .y0(() => height)
      .y1((d) => y.value(d.balance))

    areaPath.value = areaFn(props.chartData)

    const lineFn = areaFn.lineY1()

    linePath.value = lineFn(props.chartData)
  }
})

const wrapper = ref(null)

onMounted(() => {
  resizeObserver.observe(wrapper.value)
})
</script>
