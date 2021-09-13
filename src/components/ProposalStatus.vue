<template>
  <span
    v-if="proposal.hasPassed"
    class="bg-green-100 font-medium px-2 py-1 rounded-full text-green-800 text-xs"
  >
    Proposal Passed
  </span>
  <span
    v-else-if="
      (proposal.status === 'VOTES_FINISHED' || proposal.status === 'RESOLVED') &&
      !proposal.hasPassed
    "
    class="bg-red-100 font-medium px-2 py-1 rounded-full text-red-800 text-xs"
  >
    Proposal Failed
  </span>
  <span
    v-else-if="proposal.status === 'VOTING' && blockNumber > parseInt(proposal.voteEndBlock)"
    class="bg-gray-100 font-medium px-2 py-1 rounded-full text-gray-800 text-xs"
  >
    Vote ended, status pending
  </span>
  <span
    v-else-if="proposal.status === 'VOTING'"
    class="bg-yellow-100 font-medium px-2 py-1 rounded-full text-xs text-yellow-800"
  >
    Voting (ends in
    {{ voteEndTime }})
  </span>
  <span
    v-else-if="proposal.status === 'QUORUM_FAILED'"
    class="bg-red-100 font-medium px-2 py-1 rounded-full text-red-800 text-xs"
  >
    Quorum Failed
  </span>
  <span
    v-else-if="
      proposal.status === 'VOTING_NOT_STARTED' && blockNumber > parseInt(proposal.voteEndBlock)
    "
    class="bg-gray-100 font-medium px-2 py-1 rounded-full text-gray-800 text-xs"
  >
    <fa icon="clock" class="mr-0.5 text-gray-400" />
    Expired without Vote
  </span>
  <span
    v-else-if="proposal.status === 'VOTING_NOT_STARTED'"
    class="bg-gray-100 font-medium px-2 py-1 rounded-full text-gray-800 text-xs"
  >
    <fa icon="clock" class="mr-0.5 text-gray-400" />
    Vote starting in
    {{ voteStartTime }}
  </span>
  <span
    v-else-if="proposal.status === 'CANCELLED'"
    class="bg-gray-100 font-medium px-2 py-1 rounded-full text-gray-800 text-xs"
  >
    Cancelled
  </span>
  <span v-else class="bg-gray-100 font-medium px-2 py-1 rounded-full text-gray-800 text-xs">
    {{ proposal.status }}
  </span>
</template>

<script>
import { defineComponent, computed } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { blockDistanceInSeconds } from '@/utils'

export default defineComponent({
  components: {},
  props: {
    proposal: {
      type: Object,
      required: true,
    },
    blockNumber: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    dayjs.extend(relativeTime)

    const voteEndTime = computed(function () {
      return dayjs()
        .add(blockDistanceInSeconds(props.blockNumber, props.proposal.voteEndBlock), 'seconds')
        .fromNow(true)
    })

    const voteStartTime = computed(function () {
      return dayjs()
        .add(blockDistanceInSeconds(props.blockNumber, props.proposal.voteStartBlock), 'seconds')
        .fromNow(true)
    })

    return {
      blockDistanceInSeconds,
      voteEndTime,
      voteStartTime,
    }
  },
})
</script>
