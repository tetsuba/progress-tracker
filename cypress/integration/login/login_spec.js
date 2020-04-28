import { LOGIN_DETAILS } from '../../../src/test/consts'

describe('@Login', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('Page has loaded', () => {
    cy.confirmLocation('/login')
  })

  describe('A user logs-in with a valid email and password', () => {
    it('should redirect user to home page', () => {
      const props = {
        email: LOGIN_DETAILS.VALID.EMAIL,
        password: LOGIN_DETAILS.VALID.PASSWORD,
      }
      cy.login(props).confirmLocation('/')
    })
  })

  describe.skip('A user logs-in with a invalid email and password', () => {
    // TODO: add this to the test
  })

  describe('A user logs-in with an incorrect password', () => {
    it('should display an error', () => {
      const props = {
        email: LOGIN_DETAILS.VALID.EMAIL,
        password: LOGIN_DETAILS.INCORRECT.PASSWORD,
      }
      cy.login(props)
        .get('.invalid-feedback')
        .contains('You have entered incorrect username or password')
    })
  })

  describe('A user logs-in with an incorrect email', () => {
    it('should display an error', () => {
      const props = {
        email: LOGIN_DETAILS.INCORRECT.EMAIL,
        password: LOGIN_DETAILS.VALID.PASSWORD,
      }
      cy.login(props)
        .get('.invalid-feedback')
        .contains('You have entered incorrect username or password')
    })
  })

  describe('A user logs-in with an email address not verified', () => {
    beforeEach(() => {
      const props = {
        email: LOGIN_DETAILS.NOT_VALID.EMAIL,
        password: LOGIN_DETAILS.VALID.PASSWORD,
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
