import { createStore, createLogger } from 'vuex'
import wallet from './modules/wallet'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    wallet,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
})
