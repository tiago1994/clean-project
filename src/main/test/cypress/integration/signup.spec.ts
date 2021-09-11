import faker from 'faker'

const baseUrl: string = Cypress.config().baseUrl

describe('Singup', () => {
  beforeEach(() => {
    cy.server()
    cy.visit('signup')
  })

  it('Shuld load with correct initial state', () => {
    cy.get('[data-testid="name-status"]').should('have.attr', 'title', 'Campo obrigatório')
    cy.get('[data-testid="email-status"]').should('have.attr', 'title', 'Campo obrigatório')
    cy.get('[data-testid="password-status"]').should('have.attr', 'title', 'Campo obrigatório')
    cy.get('[data-testid="passwordConfirmation-status"]').should('have.attr', 'title', 'Campo obrigatório')
    cy.get('[data-testid="submit"]').should('have.attr', 'disabled')
    cy.get('[data-testid="error-wrap"]').should('not.have.descendants')
  })

  it('Shuld present error state if form is invalid', () => {
    cy.get('[data-testid="name"]').type(faker.random.alphaNumeric(3))
    cy.get('[data-testid="name-status"]').should('have.attr', 'title', 'O campo name é inválido')
    cy.get('[data-testid="email"]').type(faker.random.word())
    cy.get('[data-testid="email-status"]').should('have.attr', 'title', 'O campo email é inválido')
    cy.get('[data-testid="password"]').type(faker.random.alphaNumeric(3))
    cy.get('[data-testid="password-status"]').should('have.attr', 'title', 'O campo password é inválido')
    cy.get('[data-testid="passwordConfirmation"]').type(faker.random.alphaNumeric(4))
    cy.get('[data-testid="passwordConfirmation-status"]').should('have.attr', 'title', 'O campo passwordConfirmation é inválido')
    cy.get('[data-testid="submit"]').should('have.attr', 'disabled')
    cy.get('[data-testid="error-wrap"]').should('not.have.descendants')
  })

  it('Shuld present valid state if form is valid', () => {
    const password = faker.random.alphaNumeric(10)
    cy.get('[data-testid="name"]').type(faker.name.findName())
    cy.get('[data-testid="email"]').type(faker.internet.email())
    cy.get('[data-testid="password"]').type(password)
    cy.get('[data-testid="passwordConfirmation"]').type(password)
    cy.get('[data-testid="submit"]').should('not.have.attr', 'disabled')
  })

  it('Shuld present EmailInUseError on 403', () => {
    cy.route({
      method: 'POST',
      url: /signup/,
      status: 403,
      response: {
        error: faker.random.words()
      }
    })
    const password = faker.random.alphaNumeric(10)
    cy.get('[data-testid="name"]').type(faker.name.findName())
    cy.get('[data-testid="email"]').type(faker.internet.email())
    cy.get('[data-testid="password"]').type(password)
    cy.get('[data-testid="passwordConfirmation"]').type(password)
    cy.get('[data-testid="submit"]').click()
    cy.get('[data-testid="spinner"]').should('not.exist')
    cy.get('[data-testid="main-error"]').should('contain.text', 'Esse e-mail já está em uso')
    cy.url().should('eq', `${baseUrl}/signup`)
  })

  it('Shuld present UnexpectedError on default error cases', () => {
    cy.route({
      method: 'POST',
      url: /signup/,
      status: 400,
      response: {
        error: faker.random.words()
      }
    })
    const password = faker.random.alphaNumeric(10)
    cy.get('[data-testid="name"]').type(faker.name.findName())
    cy.get('[data-testid="email"]').type(faker.internet.email())
    cy.get('[data-testid="password"]').type(password)
    cy.get('[data-testid="passwordConfirmation"]').type(password)
    cy.get('[data-testid="submit"]').click()
    cy.get('[data-testid="spinner"]').should('not.exist')
    cy.get('[data-testid="main-error"]').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
    cy.url().should('eq', `${baseUrl}/signup`)
  })

  it('Shuld save accessToken if valid credentials are provided', () => {
    cy.route({
      method: 'POST',
      url: /signup/,
      status: 200,
      response: {
        accessToken: faker.datatype.uuid(),
        name: faker.name.findName()
      }
    })
    const password = faker.random.alphaNumeric(10)
    cy.get('[data-testid="name"]').type(faker.name.findName())
    cy.get('[data-testid="email"]').type(faker.internet.email())
    cy.get('[data-testid="password"]').type(password)
    cy.get('[data-testid="passwordConfirmation"]').type(password)
    cy.get('[data-testid="submit"]').click()
    cy.get('[data-testid="spinner"]').should('not.exist')
    cy.get('[data-testid="main-error"]').should('not.exist')
    cy.url().should('eq', `${baseUrl}/`)
    cy.window().then(window => assert.isOk(window.localStorage.getItem('account')))
  })

  it('Shuld prevent multiple submits', () => {
    cy.route({
      method: 'POST',
      url: /signup/,
      status: 200,
      response: {
        accessToken: faker.datatype.uuid(),
        name: faker.name.findName()
      }
    }).as('request')
    const password = faker.random.alphaNumeric(10)
    cy.get('[data-testid="name"]').type(faker.name.findName())
    cy.get('[data-testid="email"]').type(faker.internet.email())
    cy.get('[data-testid="password"]').type(password)
    cy.get('[data-testid="passwordConfirmation"]').type(password)
    cy.get('[data-testid="submit"]').dblclick()
    cy.get('@request.all').should('have.length', 1)
  })
})
