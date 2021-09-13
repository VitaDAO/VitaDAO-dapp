<template>
  <ul role="list" class="gap-6 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
    <li
      v-for="proposal in proposals"
      :key="proposal.id"
      class="
        bg-white
        col-span-1
        divide-gray-200 divide-y
        flex flex-col
        rounded-lg
        shadow
        text-center
      "
    >
      <div class="flex flex-1 flex-col px-8 py-6">
        <div
          class="
            bg-gray-600
            flex flex-shrink-0
            h-16
            items-center
            justify-center
            mx-auto
            rounded-full
            w-16
          "
        >
          <svg
            v-if="proposal.proposalContent.type == 'funding'"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
          >
            <g fill="#ffffff">
              <path
                d="M13.1,20.4a14.273,14.273,0,0,1-2.2-.8v2.3a13.172,13.172,0,0,0,4.4.8V25h1.4V22.6A5.547,5.547,0,0,0,20,21.4a3.631,3.631,0,0,0,1.1-2.6,2.794,2.794,0,0,0-.9-2,6.243,6.243,0,0,0-2.8-1.7l-.8-.3V10.9a12.972,12.972,0,0,1,3.4.8l.8-2a9.782,9.782,0,0,0-4.1-.9V7H15.3V8.9a5.949,5.949,0,0,0-3.1,1.2A3.043,3.043,0,0,0,11,12.5a3.775,3.775,0,0,0,.8,2.3,6.332,6.332,0,0,0,2.6,1.6l.9.3v4A8.329,8.329,0,0,1,13.1,20.4Zm3.6-3.2a5.3,5.3,0,0,1,1.5.8,1.3,1.3,0,0,1,.4,1c0,.9-.6,1.4-1.9,1.6Zm-2.8-3.8a1.284,1.284,0,0,1-.4-1,1.357,1.357,0,0,1,.5-1,2.106,2.106,0,0,1,1.3-.5v3.3A3.924,3.924,0,0,1,13.9,13.4Z"
              />
              <path
                d="M16,1A15,15,0,0,0,5.768,5.061L2.854,2.146a.5.5,0,0,0-.851.3l-1,9a.5.5,0,0,0,.618.54l8-2a.5.5,0,0,0,.233-.839L7.18,6.473A12.984,12.984,0,1,1,3,16a1,1,0,0,0-2,0A15,15,0,1,0,16,1Z"
                fill="#f9e47a"
              />
            </g>
          </svg>
          <svg
            v-else-if="proposal.proposalContent.type == 'governance'"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
          >
            <g
              stroke-linecap="square"
              stroke-linejoin="miter"
              stroke-width="2"
              fill="none"
              stroke="#f9e47a"
              stroke-miterlimit="10"
            >
              <line x1="16" y1="7" x2="16" y2="1" stroke="#ffffff" />
              <rect x="16" y="2" width="4" height="2" stroke="#ffffff" />
              <line x1="5" y1="15" x2="27" y2="15" stroke-linecap="butt" />
              <line x1="5" y1="19" x2="27" y2="19" stroke-linecap="butt" />
              <line x1="12" y1="31" x2="12" y2="19" stroke-linecap="butt" />
              <line x1="20" y1="31" x2="20" y2="19" stroke-linecap="butt" />
              <polyline points="6,31 1,31 1,24 5,24 " />
              <polyline points="26,31 31,31 31,24 27,24 " />
              <polygon points="27,15 27,31 5,31 5,15 16,7 " />
            </g>
          </svg>
          <svg
            v-else-if="proposal.proposalContent.type == 'ip'"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
          >
            <g
              stroke-linecap="square"
              stroke-linejoin="miter"
              stroke-width="2"
              fill="none"
              stroke="#f9e47a"
              stroke-miterlimit="10"
            >
              <path d="M17,1H3v27 c0,1.657,1.343,3,3,3h2" />
              <path d="M9,28c0,1.657-1.343,3-3,3 h21c1.657,0,3-1.343,3-3v-2H9V28z" />
              <polyline
                points="29,11.472 29,21 25,19 21,21 21,11.471 "
                stroke-linecap="butt"
                stroke="#ffffff"
              />
              <circle cx="25" cy="7" r="6" stroke="#ffffff" />
            </g>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <g fill="#ffffff">
              <path
                d="M31.6,9.171a1,1,0,0,0-1.4.2A3.962,3.962,0,0,1,27,11a15.875,15.875,0,0,1-2.959-.271c.185.656.367,1.353.525,2.107A18,18,0,0,0,27,13a5.947,5.947,0,0,0,4.8-2.43A1,1,0,0,0,31.6,9.171Z"
              />
              <path
                d="M9,27a13.878,13.878,0,0,0-.2-2.378L5.182,21a16.075,16.075,0,0,1,2.777.267c-.185-.656-.367-1.353-.525-2.107A18,18,0,0,0,5,19a5.935,5.935,0,0,0-1.6.225l-.014-.014-.026.026A5.971,5.971,0,0,0,.2,21.43a1,1,0,0,0,1.6,1.2A4.051,4.051,0,0,1,2.951,21.6L8.91,27.56A1.965,1.965,0,0,0,9,27Z"
                fill="#f9e47a"
              />
              <path
                d="M11,15a4,4,0,0,1,4-4,15.875,15.875,0,0,1,2.959.271c-.185-.656-.367-1.353-.525-2.107A18,18,0,0,0,15,9a6.006,6.006,0,0,0-6,6,20.9,20.9,0,0,0,1.039,6.274A19.029,19.029,0,0,1,11,27a3.96,3.96,0,0,1-1.625,3.2,1,1,0,0,0,.6,1.8.992.992,0,0,0,.6-.2A5.946,5.946,0,0,0,13,27a20.9,20.9,0,0,0-1.039-6.274A19.029,19.029,0,0,1,11,15Z"
              />
              <path
                d="M21.006,5.249l3.533,3.532A13.878,13.878,0,0,0,27,9a1.938,1.938,0,0,0,.513-.073L21.575,2.99A4.048,4.048,0,0,1,22.625,1.8,1,1,0,1,0,21.43.2,5.946,5.946,0,0,0,19,5a20.9,20.9,0,0,0,1.039,6.274,19.364,19.364,0,0,1,.955,5.478l-3.533-3.533A13.878,13.878,0,0,0,15,13a2,2,0,0,0-.511.074l5.944,5.946a4,4,0,0,1-1.414,1.413l-5.944-5.944A1.96,1.96,0,0,0,13,15a13.872,13.872,0,0,0,.214,2.456l3.538,3.538a15.984,15.984,0,0,1-2.711-.265c.185.656.367,1.353.525,2.107A18,18,0,0,0,17,23a6.006,6.006,0,0,0,6-6,20.9,20.9,0,0,0-1.039-6.274A19.363,19.363,0,0,1,21.006,5.249Z"
                fill="#f9e47a"
              />
            </g>
          </svg>
        </div>
        <h3 class="font-medium leading-snug mt-4 text-gray-900 text-md">
          {{ proposal.proposalContent.title }}
        </h3>
        <dl class="flex flex-col flex-grow mt-1">
          <dd class="capitalize text-gray-500 text-sm">
            {{ proposal.proposalContent.type }} proposal
          </dd>
          <dd class="mt-1">
            <proposal-status :proposal="proposal" :block-number="blockNumber" />
          </dd>
          <!-- dummy to align vote display to box bottom -->
          <div class="flex-grow mb-5" />
          <votes-info :proposal="proposal" />
        </dl>
      </div>
      <div>
        <div class="-mt-px divide-gray-200 divide-x flex">
          <div class="flex flex-1 w-0">
            <router-link
              :to="'/proposal/' + proposal.id"
              class="
                -mr-px
                border border-transparent
                flex-1
                font-medium
                hover:text-gray-500
                inline-flex
                items-center
                justify-center
                py-4
                relative
                rounded-bl-lg
                text-gray-700 text-sm
                w-0
              "
            >
              Review
            </router-link>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { defineComponent } from 'vue'
import VotesInfo from '@/components/VotesInfo'
import ProposalStatus from '@/components/ProposalStatus'

export default defineComponent({
  components: { VotesInfo, ProposalStatus },
  props: {
    proposals: {
      type: Array,
      required: true,
    },
    blockNumber: {
      type: Number,
      required: true,
    },
  },
  setup() {
    return {}
  },
})
</script>
