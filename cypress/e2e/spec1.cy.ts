describe('Test default value for the app', () => {
  it('passes', () => {
    cy.visit('localhost:3000')
    cy.get('#country').select('Egypt')
    cy.wait(1000)
    cy.get('#camp').select('Omaka')
    cy.wait(1000)
    // make sure that show all option will show default value
    cy.get('#school').select('Show All')

    // toggle selection
    cy.wait(1000)
    cy.get('#radioButton').click()
  })
})
