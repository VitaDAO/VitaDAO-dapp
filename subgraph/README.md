# VitaDAO Subgraph

The Rinkeby subgraph is currently deployed at https://thegraph.com/legacy-explorer/subgraph/schmackofant/vitadao.

Note that it is currently deployed on the hosted version of TheGraph and on the Legacy Explorer. This is because the fully decentralized network of TheGraph doesn't support IPFS yet. 

## What is The Graph?
More Info: https://thegraph.com/docs/about/introduction

## Installation
* Run `yarn` while in the `subgraph` directory

## Usage 
* Run `yarn codegen` when you have changed the GraphQL schema (generates the typings)
* Run `yarn build` to compile

## Deployment
* You have to be authenticated with an Access Key to deploy to the Graph Explorer. This is the auth command: `graph auth --product hosted-service <ACCESS_TOKEN>`
* In the package.json deploy script you can see to which subgraph in the explorer it deploys. Change this if you're deploying with another account.
* Run `yarn deploy` to deploy the new version of the subgraph to the hosted service of The Graph

