<template>
  <div class="flex flex-col items-center">
    <div class="bg-gray-400 flex h-8 overflow-hidden rounded-lg w-full">
      <div
        class="bg-green-400 duration-1000 ease-in-out h-full transition-all"
        :style="{
          width: yesPercentage + '%',
        }"
      />
      <div
        class="bg-red-400 duration-1000 ease-in-out h-full transition-all"
        :style="{
          width: noPercentage + '%',
        }"
      />
    </div>
    <div class="font-medium mt-1.5 text-gray-700 text-xs">
      {{ yesPercentage.toFixed(2) }}% Yes / {{ noPercentage.toFixed(2) }}% No
    </div>
    <span class="font-medium text-gray-500 text-xs">
      {{ new Intl.NumberFormat('en', { maximumFractionDigits: 0 }).format(totalVotes) }}
      Total Votes
    </span>
    <span
      v-if="totalVotes < parseFloat(proposal.minVotesNeeded)"
      class="bg-yellow-100 font-medium px-1.5 py-0.5 rounded-full text-xs text-yellow-800"
    >
      Quorum not met
    </span>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  components: {},
  props: {
    proposal: {
      type: Object,
      required: true,
    },
    votesData: {
      type: [Object, null],
      default: null,
    },
  },
  setup(props) {
    const totalVotes = computed(function () {
      if (props.votesData) {
        return props.votesData.totalVotes
      } else {
        return parseFloat(props.proposal.totalVotes)
      }
    })

    const yesVotes = computed(function () {
      if (props.votesData) {
        return props.votesData.yesVotes
      } else {
        return parseFloat(props.proposal.numTokensYes)
      }
    })

    const noVotes = computed(function () {
      if (props.votesData) {
        return props.votesData.noVotes
      } else {
        return parseFloat(props.proposal.numTokensNo)
      }
    })

    const yesPercentage = computed(function () {
      if (props.proposal.numTokensYes > 0) {
        return (yesVotes.value / totalVotes.value) * 100.0
      } else {
        return 0
      }
    })

    const noPercentage = computed(function () {
      if (props.proposal.numTokensNo > 0) {
        return (noVotes.value / totalVotes.value) * 100.0
      } else {
        return 0
      }
    })

    return {
      yesPercentage,
      noPercentage,
      totalVotes,
    }
  },
})
</script>
