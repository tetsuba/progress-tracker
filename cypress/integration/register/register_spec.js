describe('@Register', () => {
  beforeEach(() => {
    cy.visit('/register')
  })

  describe('Errors', () => {
    it('should return an error if incorrect email is entered', () => {
      const props = {
        firstName: 'Ryan',
        lastName: 'Marchock',
        email: 'testtest2.com',
        password: '1234567890',
      }
      cy.registerUser(props)
      // .loginInputsInValid()
      // .get('.invalid-feedback')
      // .contains('You have entered incorrect username or password')
    })
  })
})
