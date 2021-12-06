<template>
  <div class="w-full">
    <transition name="fade" mode="out-in">
      <loading-indicator v-if="loading">Loading proposal…</loading-indicator>
      <div v-else-if="error">Error: {{ error.message }}</div>
      <div v-else-if="result && proposal">
        <div class="gap-8 grid grid-cols-12">
          <div class="col-span-12 lg:col-span-7 xl:col-span-8">
            <hr class="border-black mb-6" />

            <span class="font-medium text-black capitalize"
              >{{ proposal.proposalContent.type }} proposal</span
            >
            <span class="text-gray-500">
              | Created {{ dayjs.unix(proposal.createdAt).format('DD MMMM YYYY') }}</span
            >

            <h1 class="font-medium leading-tight text-5xl text-black mt-2">
              {{ proposal.proposalContent.title }}
            </h1>

            <p class="mt-2 text-vita-purple font-medium text-xl max-w-prose leading-normal">
              <parsed-markdown
                :apply-prose-styles="false"
                :source="proposal.proposalContent.summary"
              />
            </p>

            <a :href="proposal.proposalContent.link" target="_blank">
              <base-button icon="discourse" icon-pack="fab" class="mt-4" type="outline"
                >View Discourse Proposal</base-button
              ></a
            >

            <div class="mt-8 border-t border-gray-300 pt-6">
              <h2 class="text-black text-2xl font-semibold mb-2">Proposal Details</h2>
              <parsed-markdown :source="proposal.proposalContent.details" />
            </div>

            <div v-if="project" class="mt-8 border-t border-gray-300 pt-6">
              <h2 class="text-black text-2xl font-semibold mb-2">Project Aims & Hypothesis</h2>
              <parsed-markdown :source="project.aimsAndHypothesis" />
            </div>
          </div>
          <div id="vote" class="mt-2 lg:mt-0 col-span-12 lg:col-span-5 xl:col-span-4 space-y-8">
            <div class="bg-white rounded-xl border border-gray-300 px-6 py-8">
              <div>
                <h3 class="font-semibold leading-6 text-black text-center text-xl">
                  Vote on this proposal
                </h3>
                <div class="flex justify-center mt-8">
                  <proposal-status :proposal="proposal" :block-number="blockNumber" />
                </div>
                <votes-info class="mt-3 mb-8" :proposal="proposal" :votes-data="votesData" />
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
                    <notice-box>You have already voted on this proposal. </notice-box>
                  </div>
                  <div v-else-if="stakedVitaBalance > 0" key="vote" class="flex space-x-3">
                    <base-button icon="thumbs-up" type="success" full-width @click="voteYes"
                      >Vote Yes</base-button
                    >
                    <base-button icon="thumbs-down" type="danger" full-width @click="voteNo"
                      >Vote No</base-button
                    >
                  </div>
                  <div v-else key="stakeFirst">
                    <notice-box
                      >You have to stake some VITA before being able to vote. Go to the
                      <router-link class="underline" to="/wallet"
                        >Staking Page</router-link
                      ></notice-box
                    >
                  </div>
                </transition>
              </div>
            </div>
            <div v-if="project" class="bg-white overflow-hidden rounded-xl border border-gray-300">
              <div class="px-4 py-5 sm:px-6">
                <h3 class="font-medium leading-6 text-black text-lg">Project Details</h3>
              </div>
              <div class="border-gray-200 border-t px-4 py-5 sm:p-0">
                <dl>
                  <div
                    v-if="project.title"
                    class="py-4 sm:gap-4 sm:grid sm:grid-cols-3 sm:px-6 sm:py-5"
                  >
                    <dt class="font-medium text-vita-purple text-sm">Title</dt>
                    <dd class="mt-1 sm:col-span-2 sm:mt-0 text-black text-sm">
                      {{ project.title }}
                    </dd>
                  </div>
                  <div
                    v-if="project.summary"
                    class="py-4 sm:gap-4 sm:grid sm:grid-cols-3 sm:px-6 sm:py-5"
                  >
                    <dt class="font-medium text-vita-purple text-sm">Summary</dt>
                    <dd class="mt-1 sm:col-span-2 sm:mt-0 text-black text-sm">
                      {{ project.summary }}
                    </dd>
                  </div>
                  <div
                    v-if="project.institution"
                    class="py-4 sm:gap-4 sm:grid sm:grid-cols-3 sm:px-6 sm:py-5"
                  >
                    <dt class="font-medium text-vita-purple text-sm">Institution</dt>
                    <dd class="mt-1 sm:col-span-2 sm:mt-0 text-black text-sm">
                      {{ project.institution }}
                    </dd>
                  </div>
                  <div
                    v-if="project.researchLead"
                    class="py-4 sm:gap-4 sm:grid sm:grid-cols-3 sm:px-6 sm:py-5"
                  >
                    <dt class="font-medium text-vita-purple text-sm">Research Lead</dt>
                    <dd class="mt-1 sm:col-span-2 sm:mt-0 text-black text-sm">
                      {{ project.researchLead }}
                    </dd>
                  </div>
                  <div
                    v-if="project.fundingStage"
                    class="py-4 sm:gap-4 sm:grid sm:grid-cols-3 sm:px-6 sm:py-5"
                  >
                    <dt class="font-medium text-vita-purple text-sm">Funding Stage</dt>
                    <dd class="mt-1 sm:col-span-2 sm:mt-0 text-black text-sm">
                      {{ project.fundingStage }}
                    </dd>
                  </div>
                  <div
                    v-if="project.clinicalStage"
                    class="py-4 sm:gap-4 sm:grid sm:grid-cols-3 sm:px-6 sm:py-5"
                  >
                    <dt class="font-medium text-vita-purple text-sm">Clinical Stage</dt>
                    <dd class="mt-1 sm:col-span-2 sm:mt-0 text-black text-sm">
                      {{ project.clinicalStage }}
                    </dd>
                  </div>
                  <div
                    v-if="project.ipStatus"
                    class="py-4 sm:gap-4 sm:grid sm:grid-cols-3 sm:px-6 sm:py-5"
                  >
                    <dt class="font-medium text-vita-purple text-sm">IP Status</dt>
                    <dd class="mt-1 sm:col-span-2 sm:mt-0 text-black text-sm">
                      {{ project.ipStatus }}
                    </dd>
                  </div>
                  <div
                    v-if="project.budget"
                    class="py-4 sm:gap-4 sm:grid sm:grid-cols-3 sm:px-6 sm:py-5"
                  >
                    <dt class="font-medium text-vita-purple text-sm">Budget</dt>
                    <dd class="mt-1 sm:col-span-2 sm:mt-0 text-black text-sm">
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
import NoticeBox from '@/components/NoticeBox'
import LoadingIndicator from '@/components/LoadingIndicator'

export default defineComponent({
  components: {
    ParsedMarkdown,
    VotesInfo,
    ProposalStatus,
    BaseButton,
    NoticeBox,
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
