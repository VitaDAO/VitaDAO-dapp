import {app} from '@storybook/vue3';
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faHome,
  faWallet,
  faFile,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
app.component('fa', FontAwesomeIcon);

import "../src/index.css"

library.add(
  faHome,
  faWallet,
  faFile,
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