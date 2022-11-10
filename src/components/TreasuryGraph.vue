<template>
  <div class="rounded-2xl border border-gray-300 p-8 max-h-[433px] flex flex-col gap-3">
    <Line
      :chart-data="chartData"
      :chart-options="chartOptions"
      ref="chartInstance"
      height="433px"
    />
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
        @click="selectedTimeRange = option"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { getTreasuryUsdTimeseries } from '@/utils/queries'
import { useQuery } from '@tanstack/vue-query'
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
} from 'chart.js'
import { reactive, onMounted, ref } from 'vue'
import { Line } from 'vue-chartjs'

const selectedTimeRange = ref('1D')
const timeRanges = ['1H', '1D', '1W', '1M', '1Y']

// declare a ref to hold the element reference
// the name must match template ref value
const chartInstance = ref(null)

onMounted(() => {
  console.log(chartInstance.value.chart)
  console.log(chartInstance.value.chart.canvas)
  const ctx = chartInstance.value.chart.canvas.getContext('2d')
  const gradient = ctx.createLinearGradient(0, 0, 0, 400)
  gradient.addColorStop(0, 'rgba(10,10,10,.2)')
  gradient.addColorStop(1, 'rgba(255,255,255,1)')
  console.log(gradient)
})

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler)

const {
  data: usdValues,
  error,
  status,
} = useQuery([selectedTimeRange, 'getTreasuryUsdTimeseries'], getTreasuryUsdTimeseries)

// var canvas = document.getElementById('canvas')
// var ctx = canvas.getContext('2d')
// var gradient = ctx.createLinearGradient(0, 0, 0, 400)
// gradient.addColorStop(0, 'rgba(10,10,10,.2)')
// gradient.addColorStop(1, 'rgba(255,255,255,1)')

// const chartInstance = this.$refs.bar.chart
// console.log(chartInstance)

const gen = (function* () {
  let y = 3583
  while (true) {
    yield y
    y = y + 30 * (Math.random() - 0.5)
  }
})()

const dummyData = new Array(200).fill(null).map(() => gen.next().value)

const chartOptions = {
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
  responsive: true,
}

// TODO fix refresh of data and chart
const chartData = reactive({
  labels: (Array.isArray(usdValues) ? usdValues.map(({ timestamp }) => timestamp) : dummyData).map(
    (_, idx) => idx,
  ),
  datasets: [
    {
      data: Array.isArray(usdValues) ? usdValues.map(({ balance }) => balance) : dummyData,
      borderColor: '#6256ec',
      pointRadius: 0,
      fill: 'origin',
      backgroundColor: '#6256ec33',
    },
  ],
})
</script>
