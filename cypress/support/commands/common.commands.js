Cypress.Commands.add('textInput', ({ name, value }) => {
  if (value) {
    cy.get(`[name="${name}"]`).clear().type(value)
  }
})

Cypress.Commands.add('formIsVisible', (formId) => {
  cy.get(formId).should('be.visible').end()
})

// TODO: to be replace with clickOn
Cypress.Commands.add('submitForm', (id) => {
  cy.get(id).click().end()
})

Cypress.Commands.add('clickOn', (id) => {
  cy.get(id).click().end()
})

Cypress.Commands.add('successMessageVisible', (id) => {
  cy.get(id).should('be.visible').end()
})

Cypress.Commands.add('submitButtonDisabled', (id) => {
  cy.get(id).should('be.disabled').end()
})

Cypress.Commands.add('confirmLocation', (path) => {
  cy.location().should((loc) => {
    expect(loc.pathname).to.eq(path)
  })
})

Cypress.Commands.add('passwordStrength', (strength) => {
  cy.get('.progress-bar').contains(strength).end()
})
