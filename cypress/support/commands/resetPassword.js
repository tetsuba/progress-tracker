
Cypress.Commands.add('passwordStrength', (strength) => {
    cy
        .get('.progress-bar')
        .contains(strength)
        .end()
});

Cypress.Commands.add('submitPassword', (newPassword, confirmPassword, strength) => {
    cy
        .fillResetPasswordForm(newPassword, confirmPassword, strength)
        .submitForm('#ResetPasswordSubmit')
        .successMessage('#ResetPasswordSuccess')
        .end()
});

Cypress.Commands.add('fillResetPasswordForm', (newPassword, confirmPassword, strength) => {
    cy
        .formIsVisible('#ResetPasswordForm')
        .textInput({ name: 'newPassword', value: newPassword })
        .passwordStrength(strength)
        .textInput({ name: 'confirmPassword', value: confirmPassword })
        .end()
});

Cypress.Commands.add('passwordMatchError', () => {
    cy
        .get('.invalid-feedback')
        .contains('Passwords do not match!!!')
        .end()
});