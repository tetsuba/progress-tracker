export const passwordMatchError = ({ newPassword, confirmPassword }) => {
  if (confirmPassword.length === 0) return false
  return !newPassword.startsWith(confirmPassword)
}

export const passwordsDoNotMatched = ({ newPassword, confirmPassword }) =>
  !(newPassword === confirmPassword)

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
