// https://docs.cypress.io/api/introduction/api.html

describe('Page tests', () => {
  it('Visits the app root', () => {
    cy.visit('/')
    cy.contains('h2', 'Active proposals')
  })

  it('Visits the app proposals page', () => {
    cy.visit('/proposals')
    cy.contains('h2', 'All proposals')
  })

  it('Visits the app wallet page', () => {
    cy.visit('/wallet')
    cy.contains('h2', 'Your Wallet')
  })
})
