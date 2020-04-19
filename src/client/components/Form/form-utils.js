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
  userLoginOptions,
  verifyEmailOptions,
  sendPasswordResetConfirmationOptions
) {
  switch (true) {
    case userLoginOptions.loading:
    case verifyEmailOptions.loading:
    case sendPasswordResetConfirmationOptions.loading:
      return 'loading'

    case !!verifyEmailOptions.data:
    case !!sendPasswordResetConfirmationOptions.data:
      return 'success'

    case userLoginOptions.error &&
      userLoginOptions.error.graphQLErrors[0].name === 'email_not_verified':
      return 'emailNotVerified'

    case hideLoginForm:
      return 'forgetMyPassword'

    default:
      return 'login'
  }
}

export function getRestPasswordStatus(
  confirmation,
  resetPasswordOptions,
  sendPasswordResetConfirmationOptions
) {
  switch (true) {
    case confirmation.loading:
    case resetPasswordOptions.loading:
    case sendPasswordResetConfirmationOptions.loading:
      return 'loading'

    case !!resetPasswordOptions.data:
    case !!sendPasswordResetConfirmationOptions.data:
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
