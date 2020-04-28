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

export function getResetPasswordStatus(requestPasswordResetOptions) {
  switch (true) {
    case !!requestPasswordResetOptions.data:
      return 'success'

    default:
      return 'resetPassword'
  }
}
