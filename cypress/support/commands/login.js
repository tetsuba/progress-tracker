

Cypress.Commands.add('login', ({email, password}) => {
    cy
        .get('#loginEmail')
        .clear()
        .type(email)
        .get('#loginPassword')
        .clear()
        .type(password)
        .get('#LoginFormSubmit')
        .click()
        .end()
});

Cypress.Commands.add('loginInputsInValid', () => {
    cy
        .get('#loginEmail')
        .should('have.class', 'is-invalid')
        .get('#loginPassword')
        .should('have.class', 'is-invalid')
        .end()
});

Cypress.Commands.add('loginInputsNotInValid', () => {
    cy
        .get('#loginEmail')
        .should('not.have.class', 'is-invalid')
        .get('#loginPassword')
        .should('not.have.class', 'is-invalid')
        .end()
});

Cypress.Commands.add('forgotMyPasswordSubmit', (email) => {
    const input = { name: 'email', value: email }
    cy
        .textInput(input)
        .get('#ForgotMyPasswordSubmit')
        .click()
        .end()
});

Cypress.Commands.add('clickOnForgotPasswordLink', (email) => {
    cy
        .get('#TextLink')
        .contains('Forgot password?')
        .click()
        .end()
});

Cypress.Commands.add('backToLogin', (email) => {
    cy
        .get('#TextLink')
        .contains('back')
        .click()
        .end()
});

Cypress.Commands.add('hasWarningMessage', () => {
    cy
        .get('.text-danger')
        .contains('Could not sign you in')
        .end()
});

Cypress.Commands.add('submitEmailToBeVerified', (email) => {
    cy
      .get('#EmailVerificationEmail')
      .type(email)
      .get('#EmailVerificationSubmit')
      .click()
      .end()
});

Cypress.Commands.add('submitForgotMyPassword', (email) => {
    cy
      .get('#ForgotMyPasswordEmail')
      .type(email)
      .get('#ForgotMyPasswordSubmit')
      .click()
      .end()
});