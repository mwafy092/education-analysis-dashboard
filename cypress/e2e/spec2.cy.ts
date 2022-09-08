describe('Test another value', () => {
  it('passes', () => {
    cy.visit('localhost:3000')
    cy.get('#country').select('Egypt')
    cy.get('#camp').select('Kakuma')
    cy.get('#radioButton').click()
    cy.wait(1000)
    cy.get('#country').select('Kenya')
    cy.wait(1000)
    cy.get('#camp').select('Omaka')
  })
})
