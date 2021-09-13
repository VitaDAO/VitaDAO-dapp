# VitaDao

## Project setup
```
yarn install
```

## Configuration
You have to copy `.env.mainnet.local.example` to `.env.mainnet.local` and fill in your Infura API key (needed for WalletConnect). The same goes for the `.env.rinkeby.local.example` file. The files with `.local` ending are ignored by git and can contain sensible information like the Infura API key.

### Compiles and hot-reloads for development
`yarn dev` runs the dev server and takes the data from the `.env.mainnet.` files (configured for ethereum mainnet). Or you run `yarn rinkeby` which reads the `.env.rinkeby.` files which are configured for rinkeby testnet.

### Compiles and minifies for production
`yarn build` builds the app for production and reads the `.env.mainnet.` files (configured for ethereum mainnet). Or you run `yarn build:rinkeby` for a production build which reads the `.env.rinkeby.` files which are configured for rinkeby testnet.

### Lints and fixes files
```
yarn lint
```

### E2E Testing with Cypress
```
yarn test:e2e
```

### Developer experience
You probably get the best dev experience using VSCode and the following plugins for syntax highlighting, linting, auto-formatting, etc.:
* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [Vetur for Vue](https://marketplace.visualstudio.com/items?itemName=octref.vetur)
* [TailwindCSS](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
* [Apollo for GraphQL](https://marketplace.visualstudio.com/items?itemName=apollographql.vscode-apollo)
* [GraphQL](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql)
