<template>
  <span v-if="proposal.hasPassed" class="font-medium text-success">
    <fa icon="thumbs-up" class="mr-0.5 text-success" />
    Proposal Passed
  </span>
  <span
    v-else-if="
      (proposal.status === 'VOTES_FINISHED' || proposal.status === 'RESOLVED') &&
      !proposal.hasPassed
    "
    class="font-medium text-danger"
  >
    <fa icon="thumbs-down" class="mr-0.5 text-danger" />
    Proposal Failed
  </span>
  <span
    v-else-if="proposal.status === 'VOTING' && blockNumber > parseInt(proposal.voteEndBlock)"
    class="font-medium text-gray-600"
  >
    Vote ended, status pending
  </span>
  <span v-else-if="proposal.status === 'VOTING'" class="font-medium text-gray-600">
    <fa icon="vote-yea" class="mr-0.5 text-gray-400" />
    Voting (ends in
    {{ voteEndTime }})
  </span>
  <span v-else-if="proposal.status === 'QUORUM_FAILED'" class="font-medium text-danger">
    Quorum Failed
  </span>
  <span
    v-else-if="
      proposal.status === 'VOTING_NOT_STARTED' && blockNumber > parseInt(proposal.voteEndBlock)
    "
    class="font-medium text-gray-600"
  >
    Expired without Vote
  </span>
  <span v-else-if="proposal.status === 'VOTING_NOT_STARTED'" class="font-medium text-gray-600">
    <fa icon="clock" class="mr-0.5 text-gray-400" />
    Vote starting in
    {{ voteStartTime }}
  </span>
  <span v-else-if="proposal.status === 'CANCELLED'" class="font-medium text-gray-600">
    Cancelled
  </span>
  <span v-else class="font-medium text-gray-500">
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
