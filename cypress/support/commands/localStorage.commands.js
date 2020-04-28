/* localStorage
 *
 * Currently cannot preserve localStorage across tests.
 * LINK: https://docs.cypress.io/faq/questions/using-cypress-faq.html#How-do-I-preserve-cookies-localStorage-in-between-my-tests
 *  */

/* This is a patch to preserve the localStorage.
 *
 * EXAMPLE:
 *
 *  beforeEach(() => {
 *    cy.restoreLocalStorage();
 *  });
 *
 *  afterEach(() => {
 *    cy.saveLocalStorage();
 *  });
 *
 * */
let LOCAL_STORAGE_MEMORY = {}

Cypress.Commands.add('saveLocalStorage', () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key]
  })
})

Cypress.Commands.add('restoreLocalStorage', () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key])
  })
})
