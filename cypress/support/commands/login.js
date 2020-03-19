

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

Cypress.Commands.add('resetPassword', (email) => {
    cy
        .get('#resetPasswordEmail')
        .type(email)
        .get('#resetPasswordSubmit')
        .click()
});

Cypress.Commands.add('goToResetPassword', (email) => {
    cy
        .get('#forgotPasswordButton')
        .contains('Forgot password?')
        .click()
});

Cypress.Commands.add('backToLogin', (email) => {
    cy
        .get('#backToLoginButton')
        .contains('back')
        .click()
});