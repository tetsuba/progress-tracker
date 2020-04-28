import { getLoginStatus, getRestPasswordStatus } from '../screens-utils'

describe('getLoginStatus', () => {
  const requestPasswordResetOptions = {}

  it('should return "loading"', () => {
    const loginUserOptions = { loading: true }
    const hideLoginForm = false
    expect(getLoginStatus(hideLoginForm, loginUserOptions)).toEqual('loading')
  })

  it('should return "success"', () => {
    const loginUserOptions = { loading: false }
    const hideLoginForm = false
    const verifyUserEmailOptions = { data: {} }
    expect(
      getLoginStatus(
        hideLoginForm,
        loginUserOptions,
        verifyUserEmailOptions,
        requestPasswordResetOptions
      )
    ).toEqual('success')
  })

  it('should return "emailNotVerified"', () => {
    const loginUserOptions = {
      error: {
        graphQLErrors: [{ name: 'email_not_verified' }],
      },
    }
    const hideLoginForm = false
    const verifyUserEmailOptions = {}
    expect(
      getLoginStatus(
        hideLoginForm,
        loginUserOptions,
        verifyUserEmailOptions,
        requestPasswordResetOptions
      )
    ).toEqual('emailNotVerified')
  })

  it('should return "forgetMyPassword"', () => {
    const loginUserOptions = {}
    const hideLoginForm = true
    const verifyUserEmailOptions = {}
    expect(
      getLoginStatus(
        hideLoginForm,
        loginUserOptions,
        verifyUserEmailOptions,
        requestPasswordResetOptions
      )
    ).toEqual('forgetMyPassword')
  })

  it('should return "login"', () => {
    const loginUserOptions = {}
    const hideLoginForm = false
    const verifyUserEmailOptions = {}
    expect(
      getLoginStatus(
        hideLoginForm,
        loginUserOptions,
        verifyUserEmailOptions,
        requestPasswordResetOptions
      )
    ).toEqual('login')
  })
})

describe('getRestPasswordStatus', () => {
  const requestPasswordResetOptions = {}

  it('should return "loading"', () => {
    const confirmation = { loading: true }
    const resetUserPasswordOptions = {}
    expect(
      getRestPasswordStatus(
        confirmation,
        resetUserPasswordOptions,
        requestPasswordResetOptions
      )
    ).toEqual('loading')
  })

  it('should return "success"', () => {
    const confirmation = {}
    const resetUserPasswordOptions = { data: {} }
    expect(
      getRestPasswordStatus(
        confirmation,
        resetUserPasswordOptions,
        requestPasswordResetOptions
      )
    ).toEqual('success')
  })

  it('should return "error"', () => {
    const confirmation = { error: {} }
    const resetUserPasswordOptions = {}
    expect(
      getRestPasswordStatus(
        confirmation,
        resetUserPasswordOptions,
        requestPasswordResetOptions
      )
    ).toEqual('error')
  })

  it('should return "form"', () => {
    const confirmation = {}
    const resetUserPasswordOptions = {}
    expect(
      getRestPasswordStatus(
        confirmation,
        resetUserPasswordOptions,
        requestPasswordResetOptions
      )
    ).toEqual('form')
  })
})
