<template>
  <div class="flex flex-col items-center">
    <div class="bg-gray-400 flex h-1.5 overflow-hidden w-full">
      <div
        class="bg-success duration-1000 ease-in-out h-full transition-all"
        :style="{
          width: yesPercentage - 0.5 + '%',
        }"
      />
      <div class="bg-white" style="width: 1%" />
      <div
        class="bg-danger duration-1000 ease-in-out h-full transition-all"
        :style="{
          width: noPercentage - 0.5 + '%',
        }"
      />
    </div>
    <div class="mt-3 font-medium text-gray-300">
      <span class="text-success">{{ yesPercentage.toFixed(2) }}% Yes</span> •
      <span class="text-danger">{{ noPercentage.toFixed(2) }}% No</span>
    </div>
    <span class="text-gray-600">
      {{ new Intl.NumberFormat('en', { maximumFractionDigits: 0 }).format(totalVotes) }}
      Total Votes
      <span
        v-if="totalVotes >= parseFloat(proposal.minVotesNeeded) || proposal.votingPossible == false"
        >({{ Math.round(quorumPercentage) }}% of quorum)</span
      >
      <span>{{ proposal.isVoting }}</span>
    </span>
    <div
      v-if="totalVotes < parseFloat(proposal.minVotesNeeded)"
      class="mt-2 bg-orange-50 font-semibold text-sm px-4 py-1.5 rounded-full text-orange-400"
    >
      <fa icon="exclamation-triangle" class="mr-0.5 text-orange-300" />
      Quorum not met ({{ quorumPercentage.toFixed(2) }}%)
    </div>
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

    const quorumPercentage = computed(function () {
      return (totalVotes.value / parseFloat(props.proposal.minVotesNeeded)) * 100.0
    })

    return {
      yesPercentage,
      noPercentage,
      totalVotes,
      quorumPercentage,
    }
  },
})
</script>
