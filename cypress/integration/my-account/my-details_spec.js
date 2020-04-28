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

  describe('My details', () => {
    it('should render inputs read only', () => {
      cy.inputIsReadOnly('firstName').inputIsReadOnly('lastName')
    })
    it('should render "Edit" button', () => {
      cy.get('#MyDetailsFormEdit').contains('Edit')
    })

    describe('A user clicks on "Edit" button to update their details', () => {
      const nameExt = Date.now()
      const firstName = `John-${nameExt}`
      const lastName = `Doh-${nameExt}`

      it('should render inputs editable', () => {
        cy.clickOn('#MyDetailsFormEdit')
          .inputIsEditable('firstName')
          .inputIsEditable('lastName')
      })
      it('should render a "Cancel" and "Save" buttons', () => {
        cy.get('#MyDetailsFormCancel')
          .should('be.visible')
          .get('#MyDetailsFormSave')
          .should('be.visible')
      })
      describe('A user updates their details', () => {
        it('should update text inputs', () => {
          cy.textInput({ name: 'firstName', value: firstName })
            .should('have.value', firstName)
            .textInput({ name: 'lastName', value: lastName })
            .should('have.value', lastName)
        })
        describe('A user clicks on "Save" button to save their changes', () => {
          it('should save successfully', () => {
            cy.clickOn('#MyDetailsFormSave')
              .get('[name="firstName"]')
              .should('to.have.value', firstName)
              .get('[name="lastName"]')
              .should('to.have.value', lastName)
          })
          it('should render inputs read only', () => {
            cy.inputIsReadOnly('firstName').inputIsReadOnly('lastName')
          })
          it('should render "Edit" button', () => {
            cy.get('#MyDetailsFormEdit').contains('Edit')
          })
        })
      })
    })
    describe('A user clicks on "Edit" button', () => {
      it('should render inputs editable', () => {
        cy.clickOn('#MyDetailsFormEdit')
          .inputIsEditable('firstName')
          .inputIsEditable('lastName')
      })
      describe('A user does not want to update their details and clicks on "Cancel" button', () => {
        it('should render inputs read only', () => {
          cy.clickOn('#MyDetailsFormCancel')
            .inputIsReadOnly('firstName')
            .inputIsReadOnly('lastName')
        })
        it('should render "Edit" button', () => {
          cy.get('#MyDetailsFormEdit').contains('Edit')
        })
      })
    })
  })
})
