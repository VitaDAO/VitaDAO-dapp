<template>
  <li
    class="bg-white col-span-1 flex flex-col rounded-2xl border border-gray-300 text-center px-10 py-6 space-y-4"
  >
    <div
      class="flex flex-shrink-0 items-center w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 justify-center mx-auto"
    >
      <svg
        v-if="category == 'Funding'"
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
        v-else-if="category == 'Governance'"
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
        v-else-if="category == 'IP'"
        width="70"
        height="73"
        viewBox="0 0 70 73"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M28.3488 28.5225L28.5669 28.6317C32.4921 31.3638 37.7258 31.3638 41.651 28.6317C44.9221 26.3368 48.9563 30.0524 46.9937 33.4401L40.2336 45.2425C37.9439 49.2859 32.056 49.2859 29.7663 45.2425L23.0062 33.3308C21.0436 29.9431 25.0778 26.2275 28.3488 28.5225Z"
          stroke="#6256EC"
          stroke-width="3"
          stroke-miterlimit="10"
          stroke-linecap="round"
        />
        <path
          d="M40.2335 5.57335C41.3239 9.28892 45.7943 10.7096 48.8473 8.41467C53.2086 5.02695 59.2055 9.3982 57.3519 14.6437C56.0435 18.25 58.7694 22.0748 62.6946 21.9656C68.1463 21.8563 70.436 28.8503 65.9656 32.0195C62.8036 34.2051 62.8036 38.9042 65.9656 41.0898C70.436 44.1497 68.1463 51.253 62.6946 51.1437C58.8784 51.0344 56.0435 54.8593 57.3519 58.4656C59.2055 63.6018 53.2086 67.9731 48.8473 64.6946C45.7943 62.2904 41.3239 63.8204 40.2335 67.5359C38.7071 72.7814 31.2927 72.7814 29.6572 67.5359C28.5669 63.8204 24.0965 62.3997 21.0435 64.6946C16.6821 68.0823 10.6852 63.7111 12.5388 58.4656C13.8472 54.8593 11.1214 51.0344 7.19615 51.1437C1.74444 51.253 -0.545283 44.259 3.92512 41.0898C7.08712 38.9042 7.08712 34.2051 3.92512 32.0195C-0.545283 28.9596 1.74444 21.8563 7.19615 21.9656C11.0124 22.0748 13.8472 18.25 12.5388 14.6437C10.6852 9.50748 16.6821 5.13623 21.0435 8.41467C24.0965 10.8189 28.5669 9.28892 29.6572 5.57335C31.2927 0.327844 38.7071 0.327844 40.2335 5.57335Z"
          stroke="black"
          stroke-width="3"
          stroke-miterlimit="10"
          stroke-linecap="round"
        />
        <path
          d="M34.9999 58.4656C47.1037 58.4656 56.9158 48.6312 56.9158 36.5C56.9158 24.3687 47.1037 14.5344 34.9999 14.5344C22.8961 14.5344 13.084 24.3687 13.084 36.5C13.084 48.6312 22.8961 58.4656 34.9999 58.4656Z"
          stroke="black"
          stroke-width="3"
          stroke-miterlimit="10"
          stroke-linecap="round"
        />
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
        class="proposal-type-label uppercase inline px-8 py-1 rounded-full font-medium text-vita-purple"
        >{{ category }}</span
      >
    </div>

    <h2
      class="text-2xl font-semibold leading-tight hover:text-vita-purple transition-colors duration-150"
    >
      <router-link :to="'/snapshotproposal/' + proposal.id">{{ cleanTitle }}</router-link>
    </h2>

    <span v-if="proposal.state == 'closed'" class="font-medium text-gray-600">
      <fa icon="flag-checkered" class="mr-0.5 text-gray-400" />
      Closed
    </span>
    <span
      v-else-if="proposal.state == 'pending' && proposal.start > dayjs().unix()"
      class="font-medium text-gray-600"
    >
      <fa icon="clock" class="mr-0.5 text-gray-400" />
      Vote starting in {{ dayjs.unix(proposal.start).fromNow(true) }}
    </span>
    <span v-else-if="proposal.state == 'active'" class="font-medium text-orange-400">
      <fa icon="vote-yea" class="mr-0.5 text-orange-300" />
      Voting (ends in
      {{ dayjs.unix(proposal.end).fromNow(true) }})
    </span>

    <div class="flex-grow" />

    <div class="pt-1">
      <router-link v-slot="{ navigate, href }" :to="'/snapshotproposal/' + proposal.id">
        <base-button
          v-if="proposal.state == 'active'"
          type="secondary"
          :href="href"
          @click="navigate"
          >Review & Vote</base-button
        >
        <base-button v-else type="outline" :href="href" @click="navigate">Review</base-button>
      </router-link>
    </div>
  </li>
</template>

<script>
import { defineComponent, computed } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import BaseButton from '@/components/BaseButton.vue'

export default defineComponent({
  components: { BaseButton },
  props: {
    proposal: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    dayjs.extend(relativeTime)

    const cleanTitle = computed(function () {
      return props.proposal.title.replace(/ *\[[^\]]*]/g, '')
    })

    const category = computed(function () {
      if (props.proposal.title.startsWith('[Governance]')) {
        return 'Governance'
      } else if (props.proposal.title.startsWith('[IP]')) {
        return 'IP'
      } else if (props.proposal.title.startsWith('[Funding]')) {
        return 'Funding'
      } else {
        return 'Project'
      }
    })

    return {
      dayjs,
      relativeTime,
      cleanTitle,
      category,
    }
  },
})
</script>

<style scoped>
.proposal-type-label {
  background: color-mod(theme('colors.vita-purple') lightness(+33%));
}
</style>
