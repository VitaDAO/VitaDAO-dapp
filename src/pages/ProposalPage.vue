<template>
  <div class="w-full">
    <transition name="fade" mode="out-in">
      <loading-indicator v-if="loading">Loading proposal…</loading-indicator>
      <div v-else-if="error">Error: {{ error.message }}</div>
      <div v-else-if="result && proposal">
        <nav class="flex max-w-full" aria-label="Breadcrumb">
          <ol class="bg-gray-200 flex px-6 rounded-md space-x-4">
            <li class="flex">
              <div class="flex items-center">
                <router-link to="/" class="hover:text-gray-500 text-gray-400">
                  <fa icon="home" />
                  <span class="sr-only">Home</span>
                </router-link>
              </div>
            </li>
            <li class="flex">
              <div class="flex items-center">
                <svg
                  class="flex-shrink-0 h-full text-gray-300 w-6"
                  viewBox="0 0 24 44"
                  preserveAspectRatio="none"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                </svg>
                <router-link
                  to="/proposals"
                  class="font-medium hover:text-gray-700 ml-4 text-gray-500 text-sm"
                  >Proposals</router-link
                >
              </div>
            </li>
            <li class="flex">
              <div class="flex items-center">
                <svg
                  class="flex-shrink-0 h-full text-gray-300 w-6"
                  viewBox="0 0 24 44"
                  preserveAspectRatio="none"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                </svg>
                <div class="font-medium hover:text-gray-700 ml-4 text-gray-500 text-sm">
                  Proposal #{{ proposal.id }}
                </div>
              </div>
            </li>
          </ol>
        </nav>
        <h1 class="font-bold leading-tight mt-4 text-2xl text-gray-700">
          {{ proposal.proposalContent.title }}
        </h1>
        <span class="font-medium text-gray-600 text-sm uppercase"
          >{{ proposal.proposalContent.type }} proposal</span
        >
        <span class="font-medium text-gray-400 text-sm">
          (created {{ dayjs.unix(proposal.createdAt).format('MM-DD-YYYY') }})</span
        >
        <div class="mt-4 lg:hidden">
          <a class="text-blue-500 hover:underline" href="#vote">↓ Jump to vote</a>
        </div>
        <div class="gap-6 grid grid-cols-12 mt-4 lg:mt-6">
          <div class="col-span-12 lg:col-span-7 xl:col-span-8 space-y-8">
            <div class="bg-white overflow-hidden px-5 py-6 rounded-lg shadow-md sm:px-8">
              <h2 class="leading-snug text-gray-600 text-xl font-medium mb-2">Proposal Summary</h2>
              <parsed-markdown :source="proposal.proposalContent.summary" />
            </div>

            <div class="bg-white overflow-hidden px-5 py-6 rounded-lg shadow-md sm:px-8">
              <h2 class="leading-snug text-gray-600 text-xl font-medium mb-2">Proposal Details</h2>
              <parsed-markdown :source="proposal.proposalContent.details" />
            </div>
            <div v-if="project">
              <div class="bg-white overflow-hidden px-5 py-6 rounded-lg shadow-md sm:px-8">
                <h2 class="leading-snug text-gray-600 text-xl font-medium mb-2">
                  Project Aims & Hypothesis
                </h2>
                <parsed-markdown :source="project.aimsAndHypothesis" />
              </div>
            </div>

            <div class="bg-white overflow-hidden px-5 py-6 rounded-lg shadow-md sm:px-8">
              <h2 class="leading-snug text-gray-600 text-xl font-medium">Proposal Link</h2>
              <a
                class="text-blue-500 hover:underline"
                :href="proposal.proposalContent.link"
                target="_blank"
                >»{{ proposal.proposalContent.title }}« on Discourse</a
              >
            </div>
          </div>
          <div id="vote" class="mt-2 lg:mt-0 col-span-12 lg:col-span-5 xl:col-span-4 space-y-8">
            <div class="bg-white rounded-lg shadow-md">
              <div class="px-4 py-5 sm:px-6">
                <h3 class="font-medium leading-6 text-gray-900 text-lg">Vote</h3>
              </div>
              <div class="border-gray-200 border-t px-4 py-5 space-y-4">
                <div class="flex">
                  <proposal-status :proposal="proposal" :block-number="blockNumber" />
                </div>
                <votes-info :proposal="proposal" :votes-data="votesData" />
              </div>
              <div class="border-gray-200 border-t px-4 py-5 space-y-4">
                <transition name="fade" mode="out-in">
                  <div v-if="!walletIsConnected" key="connectWalletFirst">
                    <base-button full-width type="primary" @click="openConnectWalletModal"
                      >Connect Wallet to vote</base-button
                    >
                  </div>
                  <div v-else-if="isVoting" key="alreadyVoting">
                    <base-button :loading="true" type="secondary" full-width :disabled="true"
                      >Voting</base-button
                    >
                  </div>
                  <div v-else-if="alreadyVoted || lastVoteWasThis" key="votedAlready">
                    <warning-box>You have already voted on this proposal. </warning-box>
                  </div>
                  <div v-else-if="stakedVitaBalance > 0" key="vote" class="flex space-x-3">
                    <base-button full-width @click="voteYes">Vote Yes</base-button>
                    <base-button full-width @click="voteNo">Vote No</base-button>
                  </div>
                  <div v-else key="stakeFirst">
                    <warning-box
                      >You have to stake some VITA before being able to vote. Go to the
                      <router-link class="underline" to="/wallet"
                        >Staking Page</router-link
                      ></warning-box
                    >
                  </div>
                </transition>
              </div>
            </div>
            <div v-if="project" class="bg-white overflow-hidden rounded-lg shadow-md">
              <div class="px-4 py-5 sm:px-6">
                <h3 class="font-medium leading-6 text-gray-900 text-lg">Project Details</h3>
              </div>
              <div class="border-gray-200 border-t px-4 py-5 sm:p-0">
                <dl class="sm:divide-gray-200 sm:divide-y">
                  <div
                    v-if="project.title"
                    class="py-4 sm:gap-4 sm:grid sm:grid-cols-3 sm:px-6 sm:py-5"
                  >
                    <dt class="font-medium text-gray-500 text-sm">Title</dt>
                    <dd class="mt-1 sm:col-span-2 sm:mt-0 text-gray-900 text-sm">
                      {{ project.title }}
                    </dd>
                  </div>
                  <div
                    v-if="project.summary"
                    class="py-4 sm:gap-4 sm:grid sm:grid-cols-3 sm:px-6 sm:py-5"
                  >
                    <dt class="font-medium text-gray-500 text-sm">Summary</dt>
                    <dd class="mt-1 sm:col-span-2 sm:mt-0 text-gray-900 text-sm">
                      {{ project.summary }}
                    </dd>
                  </div>
                  <div
                    v-if="project.institution"
                    class="py-4 sm:gap-4 sm:grid sm:grid-cols-3 sm:px-6 sm:py-5"
                  >
                    <dt class="font-medium text-gray-500 text-sm">Institution</dt>
                    <dd class="mt-1 sm:col-span-2 sm:mt-0 text-gray-900 text-sm">
                      {{ project.institution }}
                    </dd>
                  </div>
                  <div
                    v-if="project.researchLead"
                    class="py-4 sm:gap-4 sm:grid sm:grid-cols-3 sm:px-6 sm:py-5"
                  >
                    <dt class="font-medium text-gray-500 text-sm">Research Lead</dt>
                    <dd class="mt-1 sm:col-span-2 sm:mt-0 text-gray-900 text-sm">
                      {{ project.researchLead }}
                    </dd>
                  </div>
                  <div
                    v-if="project.fundingStage"
                    class="py-4 sm:gap-4 sm:grid sm:grid-cols-3 sm:px-6 sm:py-5"
                  >
                    <dt class="font-medium text-gray-500 text-sm">Funding Stage</dt>
                    <dd class="mt-1 sm:col-span-2 sm:mt-0 text-gray-900 text-sm">
                      {{ project.fundingStage }}
                    </dd>
                  </div>
                  <div
                    v-if="project.clinicalStage"
                    class="py-4 sm:gap-4 sm:grid sm:grid-cols-3 sm:px-6 sm:py-5"
                  >
                    <dt class="font-medium text-gray-500 text-sm">Clinical Stage</dt>
                    <dd class="mt-1 sm:col-span-2 sm:mt-0 text-gray-900 text-sm">
                      {{ project.clinicalStage }}
                    </dd>
                  </div>
                  <div
                    v-if="project.ipStatus"
                    class="py-4 sm:gap-4 sm:grid sm:grid-cols-3 sm:px-6 sm:py-5"
                  >
                    <dt class="font-medium text-gray-500 text-sm">IP Status</dt>
                    <dd class="mt-1 sm:col-span-2 sm:mt-0 text-gray-900 text-sm">
                      {{ project.ipStatus }}
                    </dd>
                  </div>
                  <div
                    v-if="project.budget"
                    class="py-4 sm:gap-4 sm:grid sm:grid-cols-3 sm:px-6 sm:py-5"
                  >
                    <dt class="font-medium text-gray-500 text-sm">Budget</dt>
                    <dd class="mt-1 sm:col-span-2 sm:mt-0 text-gray-900 text-sm">
                      {{
                        new Intl.NumberFormat('en', { maximumFractionDigits: 0 }).format(
                          parseFloat(project.budget),
                        )
                      }}
                      {{ project.budgetCurrency }}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { defineComponent, reactive, watch, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useQuery, useResult } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import dayjs from 'dayjs'
import ParsedMarkdown from '@/components/ParsedMarkdown'
import VotesInfo from '@/components/VotesInfo'
import ProposalStatus from '@/components/ProposalStatus'
import BaseButton from '@/components/BaseButton'
import WarningBox from '@/components/WarningBox'
import LoadingIndicator from '@/components/LoadingIndicator'

export default defineComponent({
  components: {
    ParsedMarkdown,
    VotesInfo,
    ProposalStatus,
    BaseButton,
    WarningBox,
    LoadingIndicator,
  },
  setup() {
    const route = useRoute()
    const store = useStore()

    const connectedAddress = computed(() => store.state.wallet.connectionInfo.address)
    const walletIsConnected = computed(() => store.state.wallet.isConnected)

    const { result, loading, error } = useQuery(
      gql`
        query getProposalById($id: ID!, $voteId: ID!) {
          proposal(id: $id) {
            id
            title
            status
            createdAt
            voteStartBlock
            voteEndBlock
            numTokensNo
            numTokensYes
            totalVotes
            votingPossible
            minVotesNeeded
            hasPassed
            proposalContent {
              id
              type
              title
              summary
              link
              details
              project {
                id
                fundingStage
                title
                researchLead
                institution
                clinicalStage
                ipStatus
                budget
                budgetCurrency
                summary
                aimsAndHypothesis
              }
            }
          }
          _meta {
            block {
              number
            }
          }
          votes(first: 1, where: { id: $voteId }) {
            id
            proposal {
              id
            }
            voter {
              id
            }
          }
        }
      `,
      () => ({
        id: route.params.id,
        // address in subgraph is lowercase, so we need that here as well
        voteId: walletIsConnected.value
          ? `${route.params.id}-${connectedAddress.value.toLowerCase()}`
          : 'null',
      }),
      {
        pollInterval: parseFloat(process.env.VUE_APP_AVERAGE_BLOCK_TIME) * 1000,
      },
    )

    const proposal = useResult(result, null, (data) => data.proposal)
    const project = useResult(result, null, (data) => data.proposal.proposalContent.project)
    const blockNumber = useResult(result, null, (data) => data._meta.block.number)

    const lastVoteWasThis = computed(function () {
      if (result.value && result.value.proposal) {
        return store.state.wallet.lastVotedProposalId == parseInt(result.value.proposal.id)
      } else {
        return false
      }
    })

    const votesData = reactive({
      yesVotes:
        result.value && result.value.proposal ? parseFloat(result.value.proposal.numTokensYes) : 0,
      noVotes:
        result.value && result.value.proposal ? parseFloat(result.value.proposal.numTokensNo) : 0,
      totalVotes:
        result.value && result.value.proposal ? parseFloat(result.value.proposal.totalVotes) : 0,
    })

    watch(result, (value) => {
      // sometimes this comes back as undefined
      if (value) {
        votesData.noVotes = parseFloat(value.proposal.numTokensNo)
        votesData.yesVotes = parseFloat(value.proposal.numTokensYes)
        votesData.totalVotes = parseFloat(value.proposal.totalVotes)
      }
    })

    async function voteYes() {
      try {
        await store.dispatch('wallet/vote', { proposalId: proposal.value.id, direction: true })
      } catch (e) {
        store.commit('wallet/setIsVoting', false)
        console.log('user rejected or other error', e)
      }
    }

    async function voteNo() {
      try {
        await store.dispatch('wallet/vote', { proposalId: proposal.value.id, direction: false })
      } catch (e) {
        store.commit('wallet/setIsVoting', false)
        console.log('user rejected or other error', e)
      }
    }

    function openConnectWalletModal() {
      store.commit('wallet/setConnectWalletModalIsOpen', true)
    }

    return {
      stakedVitaBalance: computed(() => store.state.wallet.stakedVitaBalance),
      isVoting: computed(() => store.state.wallet.isVoting),
      alreadyVoted: computed(() => result.value && result.value.votes && result.value.votes.length),
      walletIsConnected,
      lastVoteWasThis,
      openConnectWalletModal,
      loading,
      result,
      error,
      proposal,
      project,
      blockNumber,
      votesData,
      voteYes,
      voteNo,
      dayjs,
    }
  },
})
</script>
