<template>
  <div class="bg-white overflow-hidden rounded-xl border border-gray-300 px-6 py-8">
    <div class="flex justify-between text-base font-semibold">
      <div>{{ direction ? 'For' : 'Against' }}</div>

      <div>
        {{ new Intl.NumberFormat('en', { maximumFractionDigits: 0 }).format(totalVotes) }}
      </div>
    </div>
    <div
      class="mt-1 w-full h-1"
      :class="{
        'bg-success': direction,
        'bg-danger': !direction,
      }"
    />

    <div class="mt-4 flex justify-between text-base font-medium">
      <div>Address</div>

      <div>Voting Weight</div>
    </div>
    <hr class="border-black mt-1" />

    <div
      v-for="vote in votes"
      :key="vote.id"
      class="mt-2 flex justify-between text-base items-center space-x-3"
    >
      <div class="flex-grow-0 flex-shrink-0">
        <jazzicon :address="vote.voter.id" :diameter="26" class="mt-1.5" />
      </div>

      <a
        class="truncate hover:underline"
        target="_blank"
        :href="'https://etherscan.io/address/' + vote.voter.id"
        >{{ shortenAddress(vote.voter.id) }}</a
      >

      <div class="flex-shrink-0 flex-grow text-right">
        {{ new Intl.NumberFormat('en', { maximumFractionDigits: 0 }).format(vote.weight) }}
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { shortenAddress } from '@/utils'
import Jazzicon from 'vue3-jazzicon/src/components'

export default defineComponent({
  components: {
    Jazzicon,
  },
  props: {
    votes: {
      type: Object,
      required: true,
    },
    direction: {
      type: Boolean,
      required: true,
    },
    totalVotes: {
      type: Number,
      required: true,
    },
  },
  setup() {
    return {
      shortenAddress,
    }
  },
})
</script>
