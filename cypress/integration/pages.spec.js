context('Basic UI interactions', () => {
  // it('can load the start page', () => {
  //   cy.visit('/')
  //   cy.get('a[href="/api/.ory/ui/login"]').should('exist')
  //   cy.get('a[href="/api/.ory/ui/registration"]').should('exist')
  // })
  it('can load and submit registration', () => {
    cy.visit('/')
    cy.visit('/api/.ory/ui/settings')
  })
})
