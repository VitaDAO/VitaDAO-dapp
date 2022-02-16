import { createApp, provide, h } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { ApolloClients } from '@vue/apollo-composable'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faSpinner,
  faBars,
  faWallet,
  faFile,
  faClock,
  faFolderOpen,
  faVoteYea,
  faThumbsUp,
  faThumbsDown,
  faExclamationTriangle,
  faFlagCheckered,
} from '@fortawesome/free-solid-svg-icons'
import { faDiscord, faDiscourse } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Toast from 'vue-toastification'
import localStorageUtils from '@/utils/localstorage.js'
import { injectedWalletAvailable } from '@/utils'
import 'vue-toastification/dist/index.css'
import './index.css'
import VueGtag from 'vue-gtag'

// HTTP connection to the API
const vitaSubgraphHttpLink = createHttpLink({
  // You should use an absolute URL here
  uri: process.env.VUE_APP_SUBGRAPH_URL,
})

const snapshotHttpLink = createHttpLink({
  // You should use an absolute URL here
  uri: process.env.VUE_APP_SNAPSHOT_SUBGRAPH_URL,
})

// Create the apollo client
const vitaSubgraphClient = new ApolloClient({
  link: vitaSubgraphHttpLink,
  cache: new InMemoryCache(),
})

const snapshotClient = new ApolloClient({
  link: snapshotHttpLink,
  cache: new InMemoryCache(),
})

library.add(
  faSpinner,
  faBars,
  faWallet,
  faFile,
  faClock,
  faFolderOpen,
  faDiscord,
  faDiscourse,
  faVoteYea,
  faThumbsUp,
  faThumbsDown,
  faExclamationTriangle,
  faFlagCheckered,
)

// Metamask or similar available?
if (injectedWalletAvailable()) {
  console.log('MetaMask or similar is available!')
}

// Check if metamask has permission on app start
let isConnected = localStorageUtils.read('walletIsConnected') || false
let walletProvider = localStorageUtils.read('walletProvider') || null
if (isConnected) {
  if (walletProvider === 'injected') {
    store.dispatch('wallet/connectInjected')
  } else {
    store.dispatch('wallet/connectWalletConnect')
  }
}

createApp({
  setup() {
    provide(ApolloClients, {
      default: vitaSubgraphClient,
      snapshot: snapshotClient,
    })
  },

  render: () => h(App),
})
  .use(VueGtag, {
    config: { id: process.env.VUE_APP_GOOGLE_TAG_MANAGER_ID },
  })
  .use(store)
  .use(router)
  .use(Toast)
  .component('fa', FontAwesomeIcon)
  .mount('#app')
