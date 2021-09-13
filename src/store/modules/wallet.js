import { ethers } from 'ethers'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { useToast } from 'vue-toastification'
import localStorageUtils from '@/utils/localstorage.js'
import {
  VITA_MAX_APPROVE_AMOUNT,
  VITA_TOKEN_DECIMALS,
  ETHEREUM_MAX_INTEGER,
} from '@/utils/constants'

import tokenABI from '@/abis/VITA.json'
import raphaelABI from '@/abis/Raphael.json'
import stakingABI from '@/abis/Staking.json'

// Initial state
const state = () => ({
  isConnected: localStorageUtils.read('walletIsConnected'),
  walletProvider: localStorageUtils.read('walletProvider') || null,
  connectionInfo: localStorageUtils.read('connectionInfo') || {
    address: null,
    chainId: null,
  },
  connectWalletModalIsOpen: false,
  loadingUserDetails: false,
  ethBalance: 0.0,
  ensName: null,
  vitaIsApproved: false,
  approvingVita: false,
  vitaBalance: 0.0,
  stakedVitaBalance: 0.0,
  stakingVita: false,
  unstakingVita: false,
  isVoting: false,
  stakeUnlockBlock: null,
  lastVotedProposalId: null,
  currentBlock: 0,
})

const chainIds = [
  {
    id: 1,
    name: 'mainnet',
  },
  {
    id: 3,
    name: 'ropsten',
  },
  {
    id: 4,
    name: 'rinkeby',
  },
]

const toast = useToast()

let ethersInstance
let signer
let tokenContract
let tokenContractWithSigner
let stakingContract
let stakingContractWithSigner
let daoContract
let daoContractWithSigner

// getters
const getters = {
  currentNetwork: (state) => {
    return chainIds.find((n) => n.id === state.connectionInfo.chainId)
  },
  correctNetwork: () => {
    return chainIds.find((n) => n.id === parseInt(process.env.VUE_APP_ETHEREUM_CHAIN_ID))
  },
  getNetworkById: () => (id) => {
    return chainIds.find((n) => n.id === id)
  },
  isWrongNetwork: (state, getters) => {
    return (
      state.isConnected &&
      parseInt(getters['currentNetwork'].id) !== parseInt(process.env.VUE_APP_ETHEREUM_CHAIN_ID)
    )
  },
  isTransacting: (state) => {
    return state.approvingVita || state.stakingVita || state.unstakingVita || state.isVoting
  },
}

// actions
const actions = {
  async initUser({ commit, state, dispatch }) {
    const network = await ethersInstance.getNetwork()
    commit('setChainId', network.chainId)

    // Get ENS Name if available
    const ensName = await ethersInstance.lookupAddress(state.connectionInfo.address)
    commit('setEnsName', ensName)

    tokenContract = new ethers.Contract(
      process.env.VUE_APP_VITA_TOKEN_ADDRESS,
      tokenABI.abi,
      ethersInstance,
    )
    tokenContractWithSigner = tokenContract.connect(signer)

    // Check if VITA token is approved
    let allowance = await tokenContract.allowance(
      state.connectionInfo.address,
      process.env.VUE_APP_STAKING_CONTRACT_ADDRESS,
    )
    if (allowance.gte(ethers.utils.parseUnits(VITA_MAX_APPROVE_AMOUNT, VITA_TOKEN_DECIMALS))) {
      commit('setVitaIsApproved', true)
    }

    stakingContract = new ethers.Contract(
      process.env.VUE_APP_STAKING_CONTRACT_ADDRESS,
      stakingABI.abi,
      ethersInstance,
    )
    stakingContractWithSigner = stakingContract.connect(signer)

    daoContract = new ethers.Contract(
      process.env.VUE_APP_DAO_CONTRACT_ADDRESS,
      raphaelABI.abi,
      ethersInstance,
    )
    daoContractWithSigner = daoContract.connect(signer)

    await dispatch('updateUserBalances')

    ///// ////////
    /// CONTRACT EVENTS
    //////////////

    let incomingFilter = tokenContract.filters.Transfer(null, state.connectionInfo.address)
    let outgoingFilter = tokenContract.filters.Transfer(state.connectionInfo.address)

    // Listen for incoming VITA transactions (e.g. stake withdraw)
    tokenContract.on(incomingFilter, (from, to, amount) => {
      dispatch('updateUserBalances')
      console.log(`I got ${amount} from ${from}.`)
      if (
        ethers.utils.getAddress(from) ==
        ethers.utils.getAddress(process.env.VUE_APP_STAKING_CONTRACT_ADDRESS)
      ) {
        commit('setUnstakingVita', false)
        toast.success('Unstaking was successful', {
          timeout: 7500,
        })
      }
    })

    // Listen for outgoing VITA transactions (e.g. staking)
    tokenContract.on(outgoingFilter, (from, to, amount) => {
      dispatch('updateUserBalances')
      console.log(`I sent ${amount} to ${to}.`)
      if (
        ethers.utils.getAddress(to) ==
        ethers.utils.getAddress(process.env.VUE_APP_STAKING_CONTRACT_ADDRESS)
      ) {
        commit('setStakingVita', false)
        toast.success('Staking was successful', {
          timeout: 7500,
        })
      }
    })

    // Listen for VITA token approval
    tokenContract.on(
      tokenContract.filters.Approval(
        state.connectionInfo.address,
        process.env.VUE_APP_STAKING_CONTRACT_ADDRESS,
      ),
      (owner, spender, amount) => {
        if (amount.gte(ethers.utils.parseUnits(VITA_MAX_APPROVE_AMOUNT, VITA_TOKEN_DECIMALS))) {
          // Approval event seems to fire even when vita is staked/unstaked,
          // so we have to check if we were actually approving the VITA token
          if (state.approvingVita == true) {
            toast.success('VITA Token was enabled', {
              timeout: 7500,
            })
          }

          commit('setVitaIsApproved', true)
          commit('setApprovingVita', false)
        }
      },
    )

    // Listen for stake balance changes
    stakingContract.on(stakingContract.filters.StakeChanged(null), (address) => {
      dispatch('updateUserBalances')
      if (
        ethers.utils.getAddress(address) == ethers.utils.getAddress(state.connectionInfo.address)
      ) {
        commit('setStakingVita', false)
        commit('setUnstakingVita', false)
      }
    })

    // Listen for DAO votes
    daoContract.on('Voted', (voter, proposalId, weight, direction) => {
      console.log(
        `${voter} voted on ${proposalId} with ${ethers.utils.formatUnits(
          weight,
          VITA_TOKEN_DECIMALS,
        )} VITA with ${direction}`,
      )
      if (ethers.utils.getAddress(voter) == ethers.utils.getAddress(state.connectionInfo.address)) {
        commit('setLastVotedProposalId', parseInt(proposalId))
        commit('setIsVoting', false)
        toast.success('Your vote was successful', {
          timeout: 7500,
        })
      }
    })

    ///// ////////
    /// GLOBAL CHAIN EVENTS
    //////////////

    // Listen for new ethereum blocks
    ethersInstance.on('block', (blockNumber) => {
      // console.log('New block:', blockNumber)
      dispatch('updateUserBalances')
      commit('setCurrentBlock', blockNumber.toString())
    })

    // Reload page when chain was changed
    ethersInstance.provider.on('chainChanged', (chainId) => {
      console.log(`chain changed to ${chainId}`)
      window.location.reload()
      // let newChain = ethers.BigNumber.from(chainId).toNumber()
      // if (parseInt(newChain) != parseInt(process.env.VUE_APP_ETHEREUM_CHAIN_ID)) {
      //   window.location.reload()
      // } else {
      //   window.location.reload()
      // }
    })

    // Subscribe to session disconnection
    ethersInstance.on('disconnect', (code, reason) => {
      console.log('provider disconnect:', code, reason)
    })

    // Reload page if connected account was changed
    ethersInstance.provider.on('accountsChanged', function (accounts) {
      console.log('accountsChanged:', accounts[0])
      window.location.reload()
    })
  },
  async updateUserBalances({ commit, state }) {
    const ethBalance = await ethersInstance.getBalance(state.connectionInfo.address)
    commit('setEthBalance', ethers.utils.formatEther(ethBalance))

    try {
      const vitaBalance = await tokenContract.balanceOf(state.connectionInfo.address)
      commit('setVitaBalance', ethers.utils.formatUnits(vitaBalance, VITA_TOKEN_DECIMALS))
    } catch {
      commit('setVitaBalance', 0)
    }

    try {
      const stakedBalance = await stakingContract.getStakedBalance(state.connectionInfo.address)
      commit('setStakedVitaBalance', ethers.utils.formatUnits(stakedBalance, VITA_TOKEN_DECIMALS))
    } catch {
      commit('setStakedVitaBalance', 0)
    }

    try {
      const unlockTime = await stakingContract.getUnlockTime(state.connectionInfo.address)
      commit('setStakeUnlockBlock', unlockTime.toString())
    } catch (e) {
      // Do nothing
    }
  },
  async connectInjected({ commit, dispatch }) {
    let accounts
    try {
      accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      commit('setProvider', 'injected')
      commit('setAddress', accounts[0])
      ethersInstance = new ethers.providers.Web3Provider(window.ethereum)

      signer = ethersInstance.getSigner()

      commit('setLoadingUserDetails', true)
      await dispatch('initUser')

      commit('connect')
      commit('setLoadingUserDetails', false)
    } catch (e) {
      console.log('user rejected or other error', e)
    }
  },
  async connectWalletConnect({ commit, dispatch }) {
    //  Create WalletConnect Provider
    const provider = new WalletConnectProvider({
      infuraId: process.env.VUE_APP_INFURA_API_KEY,
    })

    //  Enable session (triggers QR Code modal)
    await provider.enable()

    ethersInstance = new ethers.providers.Web3Provider(provider)
    signer = ethersInstance.getSigner()
    let accounts = await ethersInstance.listAccounts()
    commit('setProvider', 'walletconnect')
    commit('setAddress', accounts[0])

    await dispatch('initUser')

    commit('connect')
  },
  async disconnect({ commit }) {
    // Remove localstorage data from external WalletConnect library
    localStorage.removeItem(`walletconnect`)
    commit('disconnect')
    commit('removeProvider')
    commit('removeChainInfo')
    window.location.reload()
  },
  async approveVitaToken({ commit }) {
    commit('setApprovingVita', true)
    await tokenContractWithSigner.approve(
      process.env.VUE_APP_STAKING_CONTRACT_ADDRESS,
      ETHEREUM_MAX_INTEGER,
    )
  },
  async stakeVitaTokens({ commit }, amount) {
    commit('setStakingVita', true)
    await stakingContractWithSigner.stake(ethers.utils.parseUnits(amount, VITA_TOKEN_DECIMALS))
    toast.info('Staking Transaction was broadcasted. Please wait for it to confirm.', {
      timeout: 7500,
    })
  },
  async unstakeVitaTokens({ commit }, amount) {
    commit('setUnstakingVita', true)
    await stakingContractWithSigner.withdraw(ethers.utils.parseUnits(amount, VITA_TOKEN_DECIMALS))
    toast.info('Unstaking Transaction was broadcasted. Please wait for it to confirm.', {
      timeout: 7500,
    })
  },
  async vote({ commit }, { proposalId, direction }) {
    commit('setIsVoting', true)
    await daoContractWithSigner.vote(proposalId, direction)
    toast.info('Voting Transaction was broadcasted. Please wait for it to confirm.', {
      timeout: 7500,
    })
  },
}

// mutations
const mutations = {
  connect(state) {
    localStorageUtils.write('walletIsConnected', true)
    state.isConnected = true
  },
  disconnect(state) {
    localStorageUtils.remove('walletIsConnected')
    state.isConnected = false
  },
  setProvider(state, value) {
    localStorageUtils.write('walletProvider', value)
    state.walletProvider = value
  },
  removeProvider(state) {
    localStorageUtils.remove('walletProvider')
    state.walletProvider = null
  },
  setAddress(state, value) {
    state.connectionInfo.address = value
    localStorageUtils.write('connectionInfo', state.connectionInfo)
  },
  setChainId(state, value) {
    state.connectionInfo.chainId = value
    localStorageUtils.write('connectionInfo', state.connectionInfo)
  },
  removeChainInfo(state) {
    state.connectionInfo = {
      address: null,
      chainId: null,
    }
    localStorageUtils.remove('connectionInfo')
  },
  setEthBalance(state, value) {
    state.ethBalance = value
  },
  setEnsName(state, value) {
    state.ensName = value
  },
  setVitaBalance(state, value) {
    state.vitaBalance = value
  },
  setStakedVitaBalance(state, value) {
    state.stakedVitaBalance = value
  },
  setVitaIsApproved(state, value) {
    state.vitaIsApproved = value
  },
  setApprovingVita(state, value) {
    state.approvingVita = value
  },
  setStakingVita(state, value) {
    state.stakingVita = value
  },
  setUnstakingVita(state, value) {
    state.unstakingVita = value
  },
  setLoadingUserDetails(state, value) {
    state.loadingUserDetails = value
  },
  setConnectWalletModalIsOpen(state, value) {
    state.connectWalletModalIsOpen = value
  },
  setIsVoting(state, value) {
    state.isVoting = value
  },
  setLastVotedProposalId(state, id) {
    state.lastVotedProposalId = id
  },
  setStakeUnlockBlock(state, block) {
    state.stakeUnlockBlock = block
  },
  setCurrentBlock(state, block) {
    state.currentBlock = block
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
