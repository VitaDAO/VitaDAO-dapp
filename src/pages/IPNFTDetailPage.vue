<template>
  <div class="w-full">
    <transition name="fade" mode="out-in">
      <loading-indicator v-if="loading">Loading proposal…</loading-indicator>
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
                  <dd class="mt-1 text-base text-white">{{ result.ipnft.properties.industry }}</dd>
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
                  <dt class="text-sm font-medium text-gray-400">Patent</dt>
                  <dd class="mt-1 text-base text-white">Not Filled Yet</dd>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-gray-400">Unique Owners</dt>
                  <dd class="mt-1 text-base text-white">602</dd>
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
                  :source="result.ipnft.evaluation_writeup"
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
            <buy-fractional :ipnft="result.ipnft" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import BuyFractional from '@/components/BuyFractional'
import ParsedMarkdown from '@/components/ParsedMarkdown'

export default defineComponent({
  components: { BuyFractional, ParsedMarkdown },
  setup() {
    const loading = false
    const error = null
    const result = {
      ipnft: {
        id: 1,
        name: 'The Longevity Molecule (IPNFT)',
        description:
          'The Scheibye-Knudsen lab has analyzed 1.5 billion prescriptions from 4.8 million individuals over 40 years in The Danish National Health Service Prescription Database and correlated this with the survival of individuals prescribed certain drugs. The Scheibye-Knudsen Lab has identified several FDA-approved medications that appear to have a strong effect on lifespan following analysis. This project focuses on testing and developing three of these small molecules as possible interventions in aging, with the first series of experiments testing these therapies in fruit flies and human cells. This is an exclusive license agreement for the IP resulting from these experiments.',
        timeline: `(Currently) Pre-Clinical Studies 1: Testing in Fruit Flies and Human Cells
- Required Funding: $500,000
- Status: Ongoing
- Duration: 24 Months

Testing the identified drugs ability to attenuate features of aging in a controlled laboratory setting. Here, we will test the molecules in human cells and in the animal model drosophila melanogaster (fruit flies). We are testing the drugs in human cells to rapidly understand how the molecules affect human cellular aging. Fruit flies are used extensively in biomedical research and particular aging research as they have a short lifespan of about 60 days.`,
        evaluation_writeup: `This program focuses on testing and developing three of these small molecules as possible interventions in aging. Specifically, we will test the drugs on human cell cultures and in various animal models. Importantly, the current anti-aging market stands at 200 billion USD, even without a single scientifically proven treatment. Our molecules targets this specific market with the aim of letting everyone live healthier, happier and longer lives.`,
        external_url: 'https://dao.vitadao.com/#/proposals/funding/3',
        image: 'https://arweave.net/gQm_NpkJIjEFD6sOVHLEJ-tZIKhRvgmYEl5es0g-YdQ',
        properties: {
          nvm_metadata: 'https://arweave.net:443/qGsHltU0PTfGTSNfYipLWnFwTi6g8Q-JRzJzhFDOio4',
          agreement_type: 'License Agreement',
          industry: 'Pharmaceutical R&D',
          research_lead: 'The Scheibye-Knudsen Lab',
        },
      },
    }

    return {
      loading,
      error,
      result,
    }
  },
})
</script>
