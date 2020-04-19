describe('@Register', () => {
  const baseProps = {
    firstName: 'Rob',
    lastName: 'Bob',
    email: 'test12345@test.com',
    newPassword: '1234567890',
    confirmPassword: '1234567890',
  }

  beforeEach(() => {
    cy.visit('/register')
  })

  it('Page has loaded', () => {
    cy.confirmLocation('/register')
  })

  /* NOTE:
   * Registering a new account is blocked. If a new account is required
   * open this file and edit the code on line 95.
   * src/server/api/user/user.CRUD.js
   *  */
  describe('A user registers an account with a password strength of "Bad"', () => {
    it('should display a success message', () => {
      const passwordStrength = 'Bad'
      const props = {
        ...baseProps,
        newPassword: '1234567890',
        confirmPassword: '1234567890',
      }
      cy.registerUserSuccess(props, passwordStrength)
    })
  })

  describe('A user registers an account with a password strength of "Weak"', () => {
    it('should display a success message', () => {
      const passwordStrength = 'Weak'
      const props = {
        ...baseProps,
        newPassword: 'tiger12',
        confirmPassword: 'tiger12',
      }
      cy.registerUserSuccess(props, passwordStrength)
    })
  })

  describe('A user registers an account with a password strength of "Good"', () => {
    it('should display a success message', () => {
      const passwordStrength = 'Good'
      const props = {
        ...baseProps,
        newPassword: 't1gr12!',
        confirmPassword: 't1gr12!',
      }
      cy.registerUserSuccess(props, passwordStrength)
    })
  })

  describe('A user registers an account with a password strength of "Strong"', () => {
    it('should display a success message', () => {
      const passwordStrength = 'Strong'
      const props = {
        ...baseProps,
        newPassword: 'G@@dPassw0d',
        confirmPassword: 'G@@dPassw0d',
      }
      cy.registerUserSuccess(props, passwordStrength)
    })
  })

  describe.only('A user can not register an account', () => {
    describe('with first name as an empty field', () => {
      it('should display html5 message and do nothing', () => {
        const props = {
          ...baseProps,
          firstName: '',
        }
        cy.registerUserErrorEmptyInputField(props, 'firstName')
      })
    })
    describe('with last name as an empty field', () => {
      it('should display html5 message and  do nothing', () => {
        const props = {
          ...baseProps,
          lastName: '',
        }
        cy.registerUserErrorEmptyInputField(props, 'firstName')
      })
    })
    describe('with email as an empty field', () => {
      it('should display html5 message and  do nothing', () => {
        const props = {
          ...baseProps,
          email: '',
        }
        cy.registerUserErrorEmptyInputField(props, 'firstName')
      })
    })
    describe('with an invalid email format', () => {
      it('should return an error message', () => {
        const props = {
          ...baseProps,
          email: 'email@testcom',
        }
        cy
          .fillRegisterForm(props)
          .clickOn('#RegisterFormSubmit')
          .emailErrorMessage('Not a valid email address')
      })
    })
    describe('with a registered email address', () => {
      it('should return an error message', () => {
        const props = {
          ...baseProps,
          email: 'test@test.com',
        }
        cy
          .fillRegisterForm(props)
          .clickOn('#RegisterFormSubmit')
          .emailErrorMessage('Email already exist')
      })
    })
    describe('with passwords not matching', () => {
      const props = {
        ...baseProps,
        newPassword: 'password',
        confirmPassword: 'passwors',
      }
      it('should display a miss match error', () => {
        cy.registerUserErrorMissMatch(props)
      })
    })
  })
})
