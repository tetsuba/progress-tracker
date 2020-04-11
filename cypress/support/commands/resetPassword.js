
Cypress.Commands.add('passwordStrength', (password, strength) => {
    const passwordInput = { name: 'password1', value: password };

    cy
        .textInput(passwordInput)
        .get('.progress-bar')
        .contains(strength)
});

// Cypress.Commands.add('passwordStrength', (password, strength) => {
//     const badPassword = { name: 'password1', value: '123456' };
//     const weakPassword = { name: 'password1', value: 'tiger12' };
//     const goodPassword = { name: 'password1', value: 'G@@dPassw0rD' };
//     const strongPassword = { name: 'password1', value: 'G@@dPassw0d' };
//     cy
//         .textInput(badPassword)
//         .textInput(weakPassword)
//         .textInput(goodPassword)
//         .textInput(strongPassword)
// });