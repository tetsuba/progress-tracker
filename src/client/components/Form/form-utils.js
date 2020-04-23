export const passwordMatchError = ({ newPassword, confirmPassword }) => {
  if (confirmPassword.length === 0) return false
  return !newPassword.startsWith(confirmPassword)
}

export const passwordsDoNotMatched = ({ newPassword, confirmPassword }) =>
  !(newPassword === confirmPassword)

// Read this for more information
// https://www.robinwieruch.de/conditional-rendering-react#multiple-conditional-renderings-in-react
export function getLoginStatus(
  hideLoginForm,
  loginUserOptions,
  verifyUserEmailOptions,
  requestPasswordResetOptions
) {
  switch (true) {
    case loginUserOptions.loading:
    case verifyUserEmailOptions.loading:
    case requestPasswordResetOptions.loading:
      return 'loading'

    case !!verifyUserEmailOptions.data:
    case !!requestPasswordResetOptions.data:
      return 'success'

    case loginUserOptions.error &&
      loginUserOptions.error.graphQLErrors[0].name === 'email_not_verified':
      return 'emailNotVerified'

    case hideLoginForm:
      return 'forgetMyPassword'

    default:
      return 'login'
  }
}

export function getRestPasswordStatus(
  confirmation,
  resetUserPasswordOptions,
  requestPasswordResetOptions
) {
  switch (true) {
    case confirmation.loading:
    case resetUserPasswordOptions.loading:
    case requestPasswordResetOptions.loading:
      return 'loading'

    case !!resetUserPasswordOptions.data:
    case !!requestPasswordResetOptions.data:
      return 'success'

    case !!confirmation.error:
      return 'error'

    default:
      return 'form'
  }
}

export function getRegistrationStatus(addNewUserOptions) {
  switch (true) {
    case !!addNewUserOptions.data:
      return 'success'

    default:
      return 'register'
  }
}

export function getConfirmAccountStatus(confirmToken, verifyUserEmailOptions) {
  switch (true) {
    case !!verifyUserEmailOptions.data:
      return 'success'

    case !!confirmToken.error:
      return 'tokenExpired'

    case !!confirmToken.data:
      return 'accountVerified'

    default:
      return 'default'
  }
}

// TODO: to be reworked. "emailNotVerified" not required after refactor
export function getLoginError(loginError) {
  if (loginError) {
    const error = loginError.graphQLErrors[0]
    switch (error.name) {
      case 'email_not_verified':
        return {
          ...error,
          emailNotVerified: true,
        }
      default:
        return {
          email: error,
          password: error,
        }
    }
  }
  return loginError
}
