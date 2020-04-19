Cypress.Commands.add('fillRegisterForm', (props) => {
  Object.entries(props).forEach(([name, value]) => {
    cy.textInput({ name, value })
  })
})

Cypress.Commands.add('registerUserSuccess', (props, passwordStrength) => {
  cy.fillRegisterForm(props)
    .passwordStrength(passwordStrength)
    .clickOn('#RegisterFormSubmit')
    .successMessageVisible('#Success')
})

// TODO: investigate how to improve this test
Cypress.Commands.add('registerUserErrorEmptyInputField', (props, name) => {
  cy.fillRegisterForm(props)
    .clickOn('#RegisterFormSubmit')
    .get(`[name="${name}"]`)
    .should('to.be.empty')
})

Cypress.Commands.add('registerUserErrorMissMatch', (props, name) => {
  cy.fillRegisterForm(props)
    .get('[name="confirmPassword"]')
    .siblings('.invalid-feedback')
    .contains('Passwords do not match!!!')
    .submitButtonDisabled('#RegisterFormSubmit')
})

Cypress.Commands.add('emailErrorMessage', (message, errorMessage) => {
  cy.get('[name="email"]').siblings('.invalid-feedback').contains(message)
})
