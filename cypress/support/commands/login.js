

Cypress.Commands.add('login', ({email, password}) => {
    cy
        .get('#loginEmail')
        .clear()
        .type(email)
        .get('#loginPassword')
        .clear()
        .type(password)
        .get('#loginButton')
        .click()
});

Cypress.Commands.add('loginInputsInValid', () => {
    cy
        .get('#loginEmail')
        .should('have.class', 'is-invalid')
        .get('#loginPassword')
        .should('have.class', 'is-invalid')
});

Cypress.Commands.add('loginInputsNotInValid', () => {
    cy
        .get('#loginEmail')
        .should('not.have.class', 'is-invalid')
        .get('#loginPassword')
        .should('not.have.class', 'is-invalid')
});

Cypress.Commands.add('forgotMyPasswordSubmit', (email) => {
    const input = { name: 'email', value: email }
    cy
        .textInput(input)
        .get('#ForgotMyPasswordSubmit')
        .click()
});

Cypress.Commands.add('goToResetPassword', (email) => {
    cy
        .get('#TextLink')
        .contains('Forgot password?')
        .click()
});

Cypress.Commands.add('backToLogin', (email) => {
    cy
        .get('#TextLink')
        .contains('back')
        .click()
});