
Cypress.Commands.add('textInput', ({name, value}) => {
    cy
        .get(`[name="${name}"]`)
        .clear()
        .type(value)
        .end()
});