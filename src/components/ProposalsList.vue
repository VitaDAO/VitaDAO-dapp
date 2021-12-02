<template>
  <ul role="list" class="gap-6 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
    <li
      v-for="proposal in proposals"
      :key="proposal.id"
      class="
        bg-white
        col-span-1
        flex flex-col
        rounded-2xl
        border border-gray-300
        text-center
        px-10
        py-8
        space-y-4
      "
    >
      <div class="flex flex-shrink-0 items-center w-20 h-20 justify-center mx-auto">
        <svg
          v-if="proposal.proposalContent.type == 'funding'"
          width="71"
          height="71"
          viewBox="0 0 71 71"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_1_372)">
            <path
              d="M45.4001 28L43 25.7C42.2 24.9 41.1001 24.4 39.9001 24.4H30.8C29.6 24.4 28.5001 24.9 27.7001 25.7L26.6 26.8C25.8 27.6 25.3 28.7 25.3 29.9C25.3 31.1 25.8 32.2 26.6 33L27.7001 34.1C28.5001 34.9 29.6 35.4 30.8 35.4H40C41.2 35.4 42.3 35.9 43.1 36.7L44.2001 37.8C45.0001 38.6 45.5 39.7 45.5 40.9C45.5 42.1 45.0001 43.2 44.2001 44L43 44.9C42.2 45.7 41.1001 46.2 39.9001 46.2H30.8C29.6 46.2 28.5001 45.7 27.7001 44.9L25.4 42.6"
              stroke="#6256EC"
              stroke-width="3"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
            <path
              d="M35.4 20V50.8"
              stroke="#6256EC"
              stroke-width="3"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
            <path
              d="M20.9 10.3C24.7 4.8 29.9 1.5 35.5 1.5C47.5 1.5 57.2001 16.7 57.2001 35.4C57.2001 54.1 47.5 69.3 35.5 69.3C23.5 69.3 13.8 54.2 13.8 35.4C13.8 31 14.3 26.8 15.3 23"
              stroke="black"
              stroke-width="3"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
            <path
              d="M45.4 56.1C42.3 56.7 38.9 57 35.4 57C31.5 57 27.7 56.6 24.2 55.8"
              stroke="black"
              stroke-width="3"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
            <path
              d="M60.8 21.1C66.1 24.9 69.3 30 69.3 35.5C69.3 41.3 65.8 46.5 60.1 50.4"
              stroke="black"
              stroke-width="3"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
            <path
              d="M9.4 49.2999C4.5 45.4999 1.5 40.7 1.5 35.4C1.5 23.4 16.7 13.7 35.4 13.7C38.9 13.7 42.2 14 45.4 14.6"
              stroke="black"
              stroke-width="3"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_1_372">
              <rect width="70.9" height="70.9" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <svg
          v-else-if="proposal.proposalContent.type == 'governance'"
          width="74"
          height="78"
          viewBox="0 0 74 78"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M38.9998 62.3H14.6998C12.2998 62.3 10.2998 60.3 10.2998 57.9V13.9C10.2998 11.5 12.2998 9.5 14.6998 9.5H51.2998C53.6998 9.5 55.6998 11.5 55.6998 13.9V42"
            stroke="black"
            stroke-width="3"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M10.3 56.3H5.9C3.5 56.3 1.5 54.3 1.5 51.9V5.9C1.5 3.5 3.5 1.5 5.9 1.5H44.5C46.9 1.5 48.9 3.5 48.9 5.9V9.5"
            stroke="black"
            stroke-width="3"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M17.2002 18.1001H49.0002"
            stroke="black"
            stroke-width="3"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M58.3001 43.8999C58.8001 45.6999 61.0001 46.3999 62.5001 45.2999C64.6001 43.6999 67.6001 45.7999 66.7001 48.2999C66.1001 50.0999 67.4001 51.8999 69.3001 51.8999C72.0001 51.7999 73.1001 55.2999 70.9001 56.7999C69.3001 57.8999 69.3001 60.1999 70.9001 61.1999C73.1001 62.6999 72.0001 66.1999 69.3001 66.0999C67.4001 65.9999 66.1001 67.8999 66.7001 69.6999C67.6001 72.1999 64.7001 74.3999 62.5001 72.6999C61.0001 71.5999 58.8001 72.2999 58.3001 74.0999C57.5001 76.6999 53.9001 76.6999 53.2001 74.0999C52.7001 72.2999 50.5001 71.5999 49.0001 72.6999C46.9001 74.2999 43.9001 72.1999 44.8001 69.6999C45.4001 67.8999 44.1001 66.0999 42.2001 66.0999C39.5001 66.1999 38.4001 62.6999 40.6001 61.1999C42.2001 60.0999 42.2001 57.7999 40.6001 56.7999C38.4001 55.2999 39.5001 51.7999 42.2001 51.8999C44.1001 51.9999 45.4001 50.0999 44.8001 48.2999C43.9001 45.7999 46.8001 43.5999 49.0001 45.2999C50.5001 46.3999 52.7001 45.6999 53.2001 43.8999C53.9001 41.3999 57.5001 41.3999 58.3001 43.8999Z"
            stroke="#6256EC"
            stroke-width="3"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M55.7002 68.5C60.9469 68.5 65.2002 64.2467 65.2002 59C65.2002 53.7533 60.9469 49.5 55.7002 49.5C50.4535 49.5 46.2002 53.7533 46.2002 59C46.2002 64.2467 50.4535 68.5 55.7002 68.5Z"
            stroke="#6256EC"
            stroke-width="3"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M17.2002 26.1001H49.0002"
            stroke="black"
            stroke-width="3"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M17.2002 34H42.1002"
            stroke="black"
            stroke-width="3"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M17.2002 42H27.1002"
            stroke="black"
            stroke-width="3"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
        </svg>

        <svg
          v-else-if="proposal.proposalContent.type == 'ip'"
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 64 64"
        >
          <title>award-49</title>
          <g fill="#000">
            <path
              fill="#6256ec"
              d="M5,5h43v17h4V2c0-0.552-0.448-1-1-1H2C1.448,1,1,1.448,1,2v52c0,0.552,0.448,1,1,1h38v-4H5V5z"
            />
            <path
              fill="#6256ec"
              d="M41,16c0-0.552-0.447-1-1-1H12c-0.553,0-1,0.448-1,1s0.447,1,1,1h28C40.553,17,41,16.552,41,16z"
            />
            <path
              fill="#6256ec"
              d="M28,27H12c-0.553,0-1,0.448-1,1s0.447,1,1,1h16c0.553,0,1-0.448,1-1S28.553,27,28,27z"
            />
            <path
              fill="#6256ec"
              d="M28,39H12c-0.553,0-1,0.448-1,1s0.447,1,1,1h16c0.553,0,1-0.448,1-1S28.553,39,28,39z"
            />
            <path
              d="M42,49.667V62c0,0.356,0.189,0.686,0.498,0.865c0.309,0.179,0.689,0.181,0.998,0.003 L50,59.152l6.504,3.716C56.657,62.956,56.829,63,57,63c0.174,0,0.347-0.045,0.502-0.135C57.811,62.686,58,62.356,58,62V49.667 C55.681,51.136,52.943,52,50,52S44.319,51.136,42,49.667z"
            />
            <path
              d="M50,24c-7.168,0-13,5.832-13,13s5.832,13,13,13s13-5.832,13-13S57.168,24,50,24z"
            />
          </g>
        </svg>

        <svg v-else viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M56.8 33.1C59.1 41.2 60.1 48.9 54.5 54.5"
            stroke="#6256EC"
            stroke-width="3"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M56.0999 1.5C50.5999 7 51.4999 14.5 53.5999 22.4"
            stroke="#6256EC"
            stroke-width="3"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M28.8 28.8C42.5 15.1 68.2001 40.8 81.8001 27.2"
            stroke="black"
            stroke-width="3"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M30 62C31.9 69.5 32.5 76.5 27.2 81.8"
            stroke="black"
            stroke-width="3"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M28.8 28.8C23.4 34.2 24.1 41.4 26.2 49"
            stroke="black"
            stroke-width="3"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M1.5 56.1C15.2 42.4 40.9 68.1 54.5 54.5"
            stroke="#6256EC"
            stroke-width="3"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M38.3 43.6L47 52.4"
            stroke="#6256EC"
            stroke-width="3"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M30.8999 36.3L34.2999 39.6"
            stroke="black"
            stroke-width="3"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M48.7 43.3L52.4 47"
            stroke="#6256EC"
            stroke-width="3"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M36.3 30.9L44.6 39.3"
            stroke="black"
            stroke-width="3"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M46.3 30.3L53 37"
            stroke="black"
            stroke-width="3"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M20.8999 70.2L25.0999 74.3"
            stroke="black"
            stroke-width="3"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M9 58.2L15.8 65"
            stroke="#6256EC"
            stroke-width="3"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M19.7 58.3L24.9 63.5"
            stroke="black"
            stroke-width="3"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M31.8999 47.9L36.9999 53"
            stroke="#6256EC"
            stroke-width="3"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M67.8999 18.6L74.2999 25.1"
            stroke="black"
            stroke-width="3"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M58.2 9L63.7999 14.5"
            stroke="#6256EC"
            stroke-width="3"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
          <path
            d="M57.6001 19L64.3001 25.7"
            stroke="#6256EC"
            stroke-width="3"
            stroke-miterlimit="10"
            stroke-linecap="round"
          />
        </svg>
      </div>

      <div>
        <span
          class="
            proposal-type-label
            uppercase
            inline
            px-8
            py-1
            rounded-full
            font-medium
            text-vita-purple
          "
          >{{ proposal.proposalContent.type }}</span
        >
      </div>

      <h2
        class="
          text-2xl
          font-semibold
          leading-tight
          hover:text-vita-purple
          transition-colors
          duration-150
        "
      >
        <router-link :to="'/proposal/' + proposal.id">{{
          proposal.proposalContent.title
        }}</router-link>
      </h2>

      <div>
        <proposal-status :proposal="proposal" :block-number="blockNumber" />
      </div>

      <votes-info :proposal="proposal" />

      <div class="flex-grow" />

      <div class="pt-2">
        <router-link v-slot="{ navigate, href }" :to="'/proposal/' + proposal.id">
          <base-button
            v-if="proposal.status == 'VOTING'"
            type="secondary"
            :href="href"
            @click="navigate"
            >Review & Vote</base-button
          >
          <base-button v-else type="outline" :href="href" @click="navigate">Review</base-button>
        </router-link>
      </div>
    </li>
  </ul>
</template>

<script>
import { defineComponent } from 'vue'
import VotesInfo from '@/components/VotesInfo'
import ProposalStatus from '@/components/ProposalStatus'
import BaseButton from '@/components/BaseButton.vue'

export default defineComponent({
  components: { VotesInfo, ProposalStatus, BaseButton },
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

<style scoped>
.proposal-type-label {
  background: color-mod(theme('colors.vita-purple') lightness(+33%));
}
</style>
