import { injectedWalletAvailable } from '@/utils'
import localStorageUtils from '@/utils/localstorage.js'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faDiscord, faDiscourse } from '@fortawesome/free-brands-svg-icons'
import {
  faBars,
  faChevronRight,
  faClock,
  faExclamationTriangle,
  faFile,
  faFlagCheckered,
  faFolderOpen,
  faSpinner,
  faThumbsDown,
  faThumbsUp,
  faVoteYea,
  faWallet,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { ApolloClients } from '@vue/apollo-composable'
import { createApp, h, provide } from 'vue'
import VueGtag from 'vue-gtag'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import App from './App.vue'
import './index.css'
import router from './router'
import store from './store'

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
  faChevronRight,
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
  .use(router)
  .use(store)
  .use(VueQueryPlugin)
  .use(
    VueGtag,
    {
      config: {
        id: process.env.VUE_APP_GOOGLE_TAG_MANAGER_ID,
      },
    },
    router,
  )
  .use(Toast)
  .component('fa', FontAwesomeIcon)
  .mount('#app')
