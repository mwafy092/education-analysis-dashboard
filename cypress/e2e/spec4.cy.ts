describe('Test empty  value for the app', () => {
  it('passes', () => {
    cy.visit('localhost:3000')
    cy.get('#country').select('Egypt')
    cy.wait(1000)
    cy.get('#camp').select('Kakuma')
    cy.wait(1000)
    cy.get('#camp').select('Omaka')
    cy.wait(2000)
    cy.get('#camp').select('Select Camp')
    cy.get('#emptyCamp').contains('Please select school')
  })
})
