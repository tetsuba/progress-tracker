import { FAKE_TOKENS } from '../../../src/test/consts'

describe('Confirm Account (email)', () => {
  it('should display a confirmation message', () => {
    cy.visit(`/confirm/${FAKE_TOKENS.CONFIRM.TOKEN}`)
      .get('h3')
      .contains('Email Verified')
  })

  describe('Confirm account (email) token expired', () => {
    beforeEach(() => {
      cy.visit(`/confirm/${FAKE_TOKENS.EXPIRED.TOKEN}`)
    })
    it('should display a confirmation message', () => {
      cy.get('h3').contains('Email verification session expired')
    })

    describe('A user submits an email to be verified', () => {
      it('should display a confirmation message', () => {
        cy.textInput({ name: 'email', value: 'email@not-validated.com' })
          .clickOn('#EmailVerificationSubmit')
          .wait(1000)
          .get('h3')
          .contains('Please check your email')
      })
    })

    describe('A user submits an email that is verified already', () => {
      it('should display an error message', () => {
        cy.textInput({ name: 'email', value: 'test@test.com' })
          .clickOn('#EmailVerificationSubmit')
          .get('.invalid-feedback')
          .contains('Email verified already. Please goto login.')
      })
    })

    describe('A user submits an incorrect email', () => {
      it('should display an error message', () => {
        cy.textInput({ name: 'email', value: 'test@incorrect.com' })
          .clickOn('#EmailVerificationSubmit')
          .get('.invalid-feedback')
          .contains('Email address does not exist')
      })
    })
  })
})
