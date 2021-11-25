module.exports = {
  client: {
    service: {
      name: 'my-graphql-app',
      url: 'https://api.thegraph.com/subgraphs/name/schmackofant/vitadao/graphql',
    },
    includes: ['src/**/*.vue', 'src/**/*.js'],
  },
  client: {
    service: {
      name: 'snapshot-app',
      url: 'https://hub.snapshot.org/graphql',
    },
    includes: ['src/**/*.vue', 'src/**/*.js'],
  },
}
