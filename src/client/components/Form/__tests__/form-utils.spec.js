import {
  passwordMatchError,
  passwordsDoNotMatched,
  getLoginStatus, getRestPasswordStatus,
} from '../form-utils'

describe('@form-utils', () => {
  describe('passwordMatchError', () => {
    it('should return an false if confirmPassword length is zero', () => {
      const passwords = {
        newPassword: '',
        confirmPassword: '',
      }
      expect(passwordMatchError(passwords)).toBeFalsy()
    })
    it('should return an true if passwords do not match', () => {
      const passwords = {
        newPassword: '1234',
        confirmPassword: '1235',
      }
      expect(passwordMatchError(passwords)).toBeTruthy()
    })
    it('should return an false if passwords match', () => {
      const passwords = {
        newPassword: '1234',
        confirmPassword: '1234',
      }
      expect(passwordMatchError(passwords)).toBeFalsy()
    })
  })

  describe('passwordsDoNotMatched', () => {
    it('should return false if passwords match', () => {
      const passwords = {
        newPassword: '1234',
        confirmPassword: '1234',
      }
      expect(passwordsDoNotMatched(passwords)).toBeFalsy()
    })

    it('should return true if passwords do not match', () => {
      const passwords = {
        newPassword: '1234',
        confirmPassword: '1235',
      }
      expect(passwordsDoNotMatched(passwords)).toBeTruthy()
    })
  })

  describe('getLoginStatus', () => {
    const sendPasswordResetConfirmationOptions = {}

    it('should return "loading"', () => {
      const userLoginOptions = { loading: true }
      const hideLoginForm = false
      expect(getLoginStatus(hideLoginForm, userLoginOptions)).toEqual('loading')
    })

    it('should return "success"', () => {
      const userLoginOptions = { loading: false }
      const hideLoginForm = false
      const verifyEmailOptions = { data: {} }
      expect(getLoginStatus(hideLoginForm, userLoginOptions, verifyEmailOptions, sendPasswordResetConfirmationOptions)).toEqual('success')
    })

    it('should return "emailNotVerified"', () => {
      const userLoginOptions = {
        error: {
          graphQLErrors: [{ name: 'email_not_verified'}]
        }
      }
      const hideLoginForm = false
      const verifyEmailOptions = {}
      expect(getLoginStatus(hideLoginForm, userLoginOptions, verifyEmailOptions, sendPasswordResetConfirmationOptions)).toEqual('emailNotVerified')
    })

    it('should return "forgetMyPassword"', () => {
      const userLoginOptions = {}
      const hideLoginForm = true
      const verifyEmailOptions = {}
      expect(getLoginStatus(hideLoginForm, userLoginOptions, verifyEmailOptions, sendPasswordResetConfirmationOptions)).toEqual('forgetMyPassword')
    })

    it('should return "login"', () => {
      const userLoginOptions = {}
      const hideLoginForm = false
      const verifyEmailOptions = {}
      expect(getLoginStatus(hideLoginForm, userLoginOptions, verifyEmailOptions, sendPasswordResetConfirmationOptions)).toEqual('login')
    })
  })

  describe('getRestPasswordStatus', () => {
    const sendPasswordResetConfirmationOptions = {}

    it('should return "loading"', () => {
      const confirmation = { loading: true }
      const resetPasswordOptions = {}
      expect(getRestPasswordStatus(confirmation, resetPasswordOptions, sendPasswordResetConfirmationOptions)).toEqual('loading')
    })

    it('should return "success"', () => {
      const confirmation = {}
      const resetPasswordOptions = { data: {} }
      expect(getRestPasswordStatus(confirmation, resetPasswordOptions, sendPasswordResetConfirmationOptions)).toEqual('success')
    })

    it('should return "error"', () => {
      const confirmation = { error: {} }
      const resetPasswordOptions = {}
      expect(getRestPasswordStatus(confirmation, resetPasswordOptions, sendPasswordResetConfirmationOptions)).toEqual('error')
    })

    it('should return "form"', () => {
      const confirmation = {}
      const resetPasswordOptions = {}
      expect(getRestPasswordStatus(confirmation, resetPasswordOptions, sendPasswordResetConfirmationOptions)).toEqual('form')
    })
  })
})
