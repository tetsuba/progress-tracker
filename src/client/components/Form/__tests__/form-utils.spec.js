import {
  passwordMatchError,
  passwordsDoNotMatched,
  getLoginStatus,
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
    it('should return "loading"', () => {
      const loading = true
      const reset = false
      expect(getLoginStatus(loading, reset)).toEqual('loading')
    })

    it('should return "reset"', () => {
      const loading = false
      const reset = true
      expect(getLoginStatus(loading, reset)).toEqual('reset')
    })

    it('should return "form"', () => {
      const loading = false
      const reset = false
      expect(getLoginStatus(loading, reset)).toEqual('form')
    })
  })
})
