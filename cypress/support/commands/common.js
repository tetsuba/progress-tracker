
Cypress.Commands.add('textInput', ({name, value}) => {
    cy
        .get(`[name="${name}"]`)
        .clear()
        .type(value)
        .end()
});

Cypress.Commands.add('formIsVisible', (formId) => {
    cy
        .get(formId)
        .should('be.visible')
        .end()
});

Cypress.Commands.add('submitForm', (id) => {
    cy
        .get(id)
        .click()
        .end()
});

Cypress.Commands.add('successMessage', (id) => {
    cy
        .get(id)
        .should('be.visible')
        .end()
});

Cypress.Commands.add('submitButtonDisabled', (id) => {
    cy
        .get(id)
        .should('be.disabled')
        .end()
});

Cypress.Commands.add('confirmLocation', (path) => {
    cy
      .location().should((loc) => {
        expect(loc.pathname).to.eq(path)
    })
});


