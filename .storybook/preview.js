import {app} from '@storybook/vue3';
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faHome,
  faSpinner,
  faBars,
  faWallet,
  faFile,
  faCoins,
  faClock,
  faFolderOpen,
  faVoteYea,
} from '@fortawesome/free-solid-svg-icons'
import { faDiscord, faDiscourse } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
app.component('fa', FontAwesomeIcon);

import "../src/index.css"

library.add(
  faHome,
  faSpinner,
  faBars,
  faWallet,
  faFile,
  faCoins,
  faClock,
  faFolderOpen,
  faDiscord,
  faDiscourse,
  faVoteYea,
)

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}