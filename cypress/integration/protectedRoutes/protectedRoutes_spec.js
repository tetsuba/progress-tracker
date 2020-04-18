describe('@ProtectedRoutes', () => {
  it('should redirect from home page to Login', () => {
    cy.visit('/')
      .location()
      .should((loc) => {
        expect(loc.pathname).to.eq('/login')
      })
  })

  it('should redirect from my account page to Login', () => {
    cy.visit('/myAccount')
      .location()
      .should((loc) => {
        expect(loc.pathname).to.eq('/login')
      })
  })

  // TODO: ADD the rest of the protected routes
})
