import { LOGIN_DETAILS } from '../../../src/test/consts'

Cypress.Commands.add('gotoMyAccount', () => {
  const props = {
    email: LOGIN_DETAILS.VALID.EMAIL,
    password: LOGIN_DETAILS.VALID.PASSWORD,
  }
  cy.visit('/login').login(props).get('a.card[href="/myAccount"]').click().end()
})

Cypress.Commands.add('inputIsReadOnly', (name) => {
  cy.get(`[name="${name}"]`).should('have.attr', 'readOnly')
})

Cypress.Commands.add('inputIsEditable', (name) => {
  cy.get(`[name="${name}"]`).should('not.have.attr', 'readOnly')
})
