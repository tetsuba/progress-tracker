describe('@MyAccount', () => {
  before(() => {
    cy.gotoMyAccount()
  })

  beforeEach(() => {
    cy.restoreLocalStorage()
  })

  afterEach(() => {
    cy.saveLocalStorage()
  })

  it('Page has loaded', () => {
    cy.confirmLocation('/myAccount')
  })

  describe('Password reset', () => {
    it('should render email input read only', () => {
      cy.inputIsReadOnly('email')
    })
    describe('A user clicks on "Reset Password" button', () => {
      it('should render a success message', () => {
        cy.clickOn('#ForgotMyPasswordSubmit')
          .get('.MyAccountResetPasswordSuccess')
          .contains('Please check your email')
          .should('be.visible')
      })
    })
  })
})
