Cypress.Commands.add(
  'registerUser',
  ({ firstName, lastName, email, password }) => {
    cy.get('#registerFirstName')
      .type(firstName)
      .get('#registerLastName')
      .type(lastName)
      .get('#registerEmail')
      .type(email)
      .get('#registerPassword')
      .type(password)
      .get('#registerButton')
      .click()
  }
)
