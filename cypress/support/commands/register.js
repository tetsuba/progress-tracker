Cypress.Commands.add(
  'fillRegisterForm',
  (props) => {
    Object.entries(props)
      .forEach(([name, value]) => {
        cy.textInput({ name, value })
      })
  }
)

Cypress.Commands.add('registerUserSuccess', (props, passwordStrength) => {
  cy
    .fillRegisterForm(props)
    .passwordStrength(passwordStrength)
    .clickOn('#RegisterFormSubmit')
    .successMessageVisible('#Success')
})

Cypress.Commands.add('registerUserErrorEmail', (props) => {
  cy
    .fillRegisterForm(props)
    .clickOn('#RegisterFormSubmit')
    .get('[name="email"]')
    .siblings('.invalid-feedback')
    .contains('Email already exist')
})

// TODO: To be fixed
Cypress.Commands.add('registerUserErrorEmptyInputField', (props, name) => {
  cy
    .fillRegisterForm(props)
    .clickOn('#RegisterFormSubmit')
    .get(`[name="${name}"]`)
})

Cypress.Commands.add('registerUserErrorMissMatch', (props, name) => {
  cy
    .fillRegisterForm(props)
    .get('[name="confirmPassword"]')
    .siblings('.invalid-feedback')
    .contains('Passwords do not match!!!')
    .submitButtonDisabled('#RegisterFormSubmit')

})



