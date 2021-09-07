describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })
  it('Shuld load with correct initial state', () => {
    cy.get('[data-testid="email-status"]').should('have.attr', 'title', 'Campo obrigatório')
    cy.get('[data-testid="password-status"]').should('have.attr', 'title', 'Campo obrigatório')
    cy.get('[data-testid="submit"]').should('have.attr', 'disabled')
    cy.get('[data-testid="error-wrap"]').should('not.have.descendants')
  })
})
