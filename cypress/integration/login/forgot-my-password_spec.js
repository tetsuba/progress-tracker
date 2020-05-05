const validEmail = 'testLogin@test.com'

describe('@Forgot My Password', () => {
  beforeEach(() => {
    cy.visit('/login').clickOnForgotPasswordLink()
  })

  it('should load forgot my password', () => {
    cy.get('h3').contains('Forgot my password')
  })

  describe('Submits a valid email address', () => {
    it('should display a success message', () => {
      cy.submitForgotMyPassword(validEmail)
        .get('#LoginSuccess > h3')
        .contains('Please check your email.')
    })
  })

  describe('Submits an incorrect email address', () => {
    it('should display an error message', () => {
      cy.submitForgotMyPassword('invalid@email.com')
        .get('.invalid-feedback')
        .contains('Email address does not exist')
    })
  })
})
