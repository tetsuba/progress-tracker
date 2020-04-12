// TODO: Delete this function and use the custom hook "useInputChange"
export const handleInputChange = (event, setInputs) => {
  event.persist()
  setInputs((inputs) => ({
    ...inputs,
    [event.target.name]: event.target.value,
  }))
}

export const passwordMatchError = ({ newPassword, confirmPassword }) => {
  if (confirmPassword.length === 0) return false
  return !newPassword.startsWith(confirmPassword)
}

export const passwordsDoNotMatched = ({ newPassword, confirmPassword }) =>
  !(newPassword === confirmPassword)

// Read this for more information
// https://www.robinwieruch.de/conditional-rendering-react#multiple-conditional-renderings-in-react
export function getLoginStatus(loading, reset) {
  return loading ? 'loading' : reset ? 'reset' : 'form'
}

export function getRestPasswordStatus(confirmation, resetPasswordOptions) {
  if (confirmation.loading || resetPasswordOptions.loading) return 'loading'
  if (
    resetPasswordOptions.data &&
    resetPasswordOptions.data.resetPassword.confirmation
  )
    return 'success'
  if (confirmation.error) return 'error'
  if (confirmation.data) return 'form'
}
