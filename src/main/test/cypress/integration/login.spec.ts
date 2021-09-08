import faker from 'faker'

const baseUrl: string = Cypress.config().baseUrl

describe('Login', () => {
  beforeEach(() => {
    cy.server()
    cy.visit('login')
  })

  it('Shuld load with correct initial state', () => {
    cy.get('[data-testid="email-status"]').should('have.attr', 'title', 'Campo obrigatório')
    cy.get('[data-testid="password-status"]').should('have.attr', 'title', 'Campo obrigatório')
    cy.get('[data-testid="submit"]').should('have.attr', 'disabled')
    cy.get('[data-testid="error-wrap"]').should('not.have.descendants')
  })

  it('Shuld present error state if form is invalid', () => {
    cy.get('[data-testid="email"]').type(faker.random.word())
    cy.get('[data-testid="email-status"]').should('have.attr', 'title', 'O campo email é inválido')
    cy.get('[data-testid="password"]').type(faker.random.alphaNumeric(3))
    cy.get('[data-testid="password-status"]').should('have.attr', 'title', 'O campo password é inválido')
    cy.get('[data-testid="submit"]').should('have.attr', 'disabled')
    cy.get('[data-testid="error-wrap"]').should('not.have.descendants')
  })

  it('Shuld present valid state if form is valid', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 401,
      response: {
        error: faker.random.words()
      }
    })
    cy.get('[data-testid="email"]').type(faker.internet.email())
    cy.get('[data-testid="password"]').type(faker.random.alphaNumeric(10))
    cy.get('[data-testid="submit"]').click()
    cy.get('[data-testid="spinner"]').should('not.exist')
    cy.get('[data-testid="main-error"]').should('contain.text', 'Credenciais inválidas')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Shuld save accessToken if valid credentials are provided', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: {
        accessToken: faker.datatype.uuid()
      }
    })
    cy.get('[data-testid="email"]').type('mango@gmail.com')
    cy.get('[data-testid="password"]').type('12345')
    cy.get('[data-testid="submit"]').click()
    cy.get('[data-testid="spinner"]').should('not.exist')
    cy.get('[data-testid="main-error"]').should('not.exist')
    cy.url().should('eq', `${baseUrl}/`)
    cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')))
  })
})
