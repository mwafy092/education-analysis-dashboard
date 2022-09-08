describe('Click on chart value', () => {
  it('passes', () => {
    cy.visit('localhost:3000')
    cy.get('#country').select('Egypt')
    cy.get('#camp').select('Kakuma')
    cy.wait(2000)
    cy.get('#radioButton').click()
    cy.wait(2000)
    cy.visit('localhost:3000/details')
    cy.wait(2000)
    cy.visit('localhost:3000')
  })
})
