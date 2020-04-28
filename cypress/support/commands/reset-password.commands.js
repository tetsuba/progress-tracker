const jwt = require('jsonwebtoken')

Cypress.Commands.add('visitWithToken', (path) => {
  const options = { id: '5e793e384c80fc70a8783fe7' }
  const expires = { expiresIn: '1h' }
  const validToken = jwt.sign(options, 'j3ji34rknr38jfsdoifhsd8fhsd', expires)

  cy.visit(`/reset/${validToken}`)
})

Cypress.Commands.add(
  'submitPassword',
  (newPassword, confirmPassword, strength) => {
    cy.fillResetPasswordForm(newPassword, confirmPassword, strength)
      .submitForm('#ResetPasswordSubmit')
      .successMessageVisible('#ResetPasswordSuccess')
      .end()
  }
)

Cypress.Commands.add(
  'fillResetPasswordForm',
  (newPassword, confirmPassword, strength) => {
    cy.formIsVisible('#ResetPasswordForm')
      .textInput({ name: 'newPassword', value: newPassword })
      .passwordStrength(strength)
      .textInput({ name: 'confirmPassword', value: confirmPassword })
      .end()
  }
)

Cypress.Commands.add('passwordMatchError', () => {
  cy.get('.invalid-feedback').contains('Passwords do not match!!!').end()
})
