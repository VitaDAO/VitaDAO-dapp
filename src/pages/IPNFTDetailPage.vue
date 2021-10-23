<template>
  <div class="w-full">
    <transition name="fade" mode="out-in">
      <loading-indicator v-if="loading">Loading token…</loading-indicator>
      <div v-else-if="error">Error: {{ error.message }}</div>
      <div v-else-if="result && result.ipnft">
        <nav class="flex max-w-full" aria-label="Breadcrumb">
          <ol class="bg-black border border-white flex px-6 rounded-md space-x-4">
            <li class="flex">
              <div class="flex items-center">
                <router-link to="/" class="hover:text-gray-300 text-white">
                  <fa icon="home" />
                  <span class="sr-only">Home</span>
                </router-link>
              </div>
            </li>
            <li class="flex">
              <div class="flex items-center">
                <svg
                  class="flex-shrink-0 h-full text-white w-6"
                  viewBox="0 0 24 44"
                  preserveAspectRatio="none"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                </svg>
                <router-link
                  to="/portfolio"
                  class="font-medium hover:text-gray-300 ml-4 text-white text-sm"
                  >Portfolio</router-link
                >
              </div>
            </li>
            <li class="flex">
              <div class="flex items-center">
                <svg
                  class="flex-shrink-0 h-full text-white w-6"
                  viewBox="0 0 24 44"
                  preserveAspectRatio="none"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                </svg>
                <div class="font-medium ml-4 text-gray-400 text-sm">
                  IP-NFT #{{ result.ipnft.id }}
                </div>
              </div>
            </li>
          </ol>
        </nav>
        <div class="gap-6 grid grid-cols-12 mt-4 lg:mt-6">
          <div class="col-span-12 lg:col-span-7 xl:col-span-8 space-y-8">
            <h1 class="font-bold leading-tight mt-4 text-2xl text-white">
              {{ result.ipnft.name }}
            </h1>
            <span class="font-medium text-gray-300 text-sm"
              >0xdf83baabf91236b5b329abc45616cc0fab2bf6aa (IP-NFT Address)
            </span>
            <span class="font-medium text-gray-400 text-sm">
              <a
                href="https://testnets.opensea.io/assets/0xdf83baabf91236b5b329abc45616cc0fab2bf6aa/47"
              >
                view on OpenSea
              </a></span
            >
            <div class="mt-4 space-y-6">
              <p class="text-sm text-white">
                {{ result.ipnft.description }}
              </p>
            </div>
            <div class="flex space-x-2">
              <div>
                <a
                  href="https://discover.molecule.to/project-details/the-longevity-molecule-1603031933959x305091127349719700"
                >
                  <button
                    type="button"
                    class="
                      inline-flex
                      items-center
                      px-4
                      py-2
                      border border-transparent
                      text-sm
                      font-medium
                      rounded-full
                      shadow-sm
                      text-white
                      bg-gray-600
                      hover:bg-gray-700
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
                    "
                  >
                    View Project Page
                  </button>
                </a>
              </div>
              <div>
                <button
                  type="button"
                  class="
                    inline-flex
                    items-center
                    px-4
                    py-2
                    border border-transparent
                    text-sm
                    font-medium
                    rounded-full
                    shadow-sm
                    text-white
                    bg-gray-600
                    hover:bg-gray-700
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
                  "
                >
                  Make Buyout Offer
                </button>
              </div>
              <div>
                <a
                  href="https://testnets.opensea.io/assets/0xdf83baabf91236b5b329abc45616cc0fab2bf6aa/47"
                >
                  <button
                    type="button"
                    class="
                      inline-flex
                      items-center
                      px-4
                      py-2
                      border border-transparent
                      text-sm
                      font-medium
                      rounded-full
                      shadow-sm
                      text-white
                      bg-gray-600
                      hover:bg-gray-700
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
                    "
                  >
                    View on OpenSea
                  </button>
                </a>
              </div>
            </div>
            <div class="py-5">
              <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
                <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-gray-400">Area</dt>
                  <dd class="mt-1 text-base text-white">{{ result.ipnft.industry }}</dd>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-gray-400">Stage</dt>
                  <dd class="mt-1 text-base text-white">Preclinical</dd>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-gray-400">Status</dt>
                  <dd class="mt-1 text-base text-white">Ongoing</dd>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-gray-400">Investment</dt>
                  <dd class="mt-1 text-base text-white">$350.000</dd>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-gray-400">Initiated</dt>
                  <dd class="mt-1 text-base text-white">08/2021</dd>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-gray-400">Patent</dt>
                  <dd class="mt-1 text-base text-white">Not Filled Yet</dd>
                </div>
              </dl>
            </div>
            <div>
              <div class="flex justify-between">
                <h2 class="font-bold mb-2 text-white text-xl">Timeline</h2>
                <a
                  href="https://discover.molecule.to/project-details/the-longevity-molecule-1603031933959x305091127349719700"
                >
                  <button
                    type="button"
                    class="
                      items-center
                      px-4
                      py-2
                      mx-20
                      border border-gray-300
                      text-sm
                      font-medium
                      rounded-full
                      shadow-sm
                      text-white
                      hover:bg-gray-900
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
                      flex
                      truncate
                    "
                  >
                    View More
                  </button>
                </a>
              </div>
              <div class="mt-2 space-y-2">
                <parsed-markdown
                  class="font-medium text-white text-sm"
                  :source="result.ipnft.timeline"
                />
              </div>
            </div>
            <div>
              <div class="flex justify-between">
                <h2 class="font-bold mb-2 text-white text-xl">Evaluation Writeup</h2>
                <a
                  href="https://discover.molecule.to/project-details/the-longevity-molecule-1603031933959x305091127349719700"
                >
                  <button
                    type="button"
                    class="
                      items-center
                      px-4
                      py-2
                      mx-20
                      border border-gray-300
                      text-sm
                      font-medium
                      rounded-full
                      shadow-sm
                      text-white
                      hover:bg-gray-900
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
                      flex
                      truncate
                    "
                  >
                    View More
                  </button>
                </a>
              </div>
              <div class="mt-2 space-y-2">
                <parsed-markdown
                  class="font-medium text-white text-sm"
                  :source="result.ipnft.evaluationWriteup"
                />
              </div>
            </div>
          </div>
          <div class="mt-2 lg:mt-0 col-span-12 lg:col-span-5 xl:col-span-4 space-y-8">
            <div class="flex flex-wrap justify-center">
              <div class="w-3/4 sm:w-1/2 px-4">
                <img
                  :src="result.ipnft.image"
                  :alt="result.ipnft.name"
                  class="shadow rounded max-w-full h-auto align-middle border-none"
                />
              </div>
            </div>
            <div class="mt-4">
              <iframe
                id="myId"
                src="https://app.uniswap.org/#/swap?theme=light&inputCurrency=ETH&outputCurrency=0x92fb912b99a6dfe72e5b6e05ecd63b0e6e71059d"
                height="660px"
                width="100%"
                style="
                  border: 0;
                  margin: 0 auto;
                  display: block;
                  border-radius: 10px;
                  max-width: 600px;
                  min-width: 300px;
                "
              />
            </div>
            <div class="py-5">
              <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div class="sm:col-span-1">
                  <dt class="text-sm font-semibold text-white">Collectable Supply</dt>
                  <dd class="mt-1 text-lg font-semibold text-white">20%</dd>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-sm font-semibold text-white">Implied Valuation</dt>
                  <dd class="mt-1 text-lg font-semibold text-white">Ξ 350</dd>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-sm font-semibold text-white">Total Supply</dt>
                  <dd class="mt-1 text-lg font-semibold text-white">1,000,000 MSK</dd>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-sm font-semibold text-white">Trading Fee</dt>
                  <dd class="mt-1 text-lg font-semibold text-white">1%</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import LoadingIndicator from '@/components/LoadingIndicator'
import ParsedMarkdown from '@/components/ParsedMarkdown'

export default defineComponent({
  components: { ParsedMarkdown, LoadingIndicator },
  setup() {
    const route = useRoute()

    const { result, loading, error } = useQuery(
      gql`
        query getTokenById($id: ID!) {
          ipnft(id: $id) {
            id
            tokenURI
            tokenContract
            name
            description
            image
            externalUrl
            researchLead
            industry
            agreementType
            timeline
            evaluationWriteup
          }
        }
      `,
      () => ({
        id: route.params.id,
      }),
    )

    return {
      loading,
      error,
      result,
    }
  },
})
</script>
