const validEmail = 'test@test.com'
const validPassword = '1234qwer'

describe('@Login', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('Page has loaded', () => {
    cy.confirmLocation('/login')
  })

  describe('A user logs-in with a valid email and password', () => {
    it('should redirect user to home page', () => {
      const props = { email: validEmail, password: validPassword }
      cy.login(props).confirmLocation('/')
    })
  })

  describe('A user logs-in with an incorrect password', () => {
    it('should display an error', () => {
      const props = { email: validEmail, password: 'incorrectPassword' }
      cy.login(props)
        .get('.invalid-feedback')
        .contains('You have entered incorrect username or password')
    })
  })

  describe('A user logs-in with an incorrect email', () => {
    it('should display an error', () => {
      const props = { email: 'incorrect@email.com', password: validPassword }
      cy.login(props)
        .get('.invalid-feedback')
        .contains('You have entered incorrect username or password')
    })
  })

  describe('A user logs-in with an email address not verified', () => {
    beforeEach(() => {
      const props = {
        email: 'email@not-validated.com',
        password: validPassword,
      }
      cy.login(props)
    })

    it('should load a warning message and a form to validate email address', () => {
      cy.hasWarningMessage()
    })

    describe('Submits a valid email address', () => {
      it('should display a confirmation message', () => {
        cy.submitEmailToBeVerified('email@not-validated.com')
          .get('#LoginSuccess')
          .contains('Please check your email')
      })
    })

    describe('Submits an email that is validated', () => {
      it('should display and error message', () => {
        cy.submitEmailToBeVerified('testLogin@test.com')
          .get('.invalid-feedback')
          .contains('Email verified already. Please goto login.')
      })
    })

    describe('Submits an incorrect email address', () => {
      it('should display and error message', () => {
        cy.submitEmailToBeVerified('incorrect@email.com')
          .get('.invalid-feedback')
          .contains('Email address does not exist')
      })
    })
  })
})
