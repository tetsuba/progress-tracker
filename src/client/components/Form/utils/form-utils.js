type passwordMatchErrorProps = {
  newPassword: string,
  confirmPassword: string,
}
export const passwordMatchError = (props: passwordMatchErrorProps) => {
  const { newPassword, confirmPassword } = props
  if (confirmPassword.length === 0) return false
  return !newPassword.startsWith(confirmPassword)
}

type PasswordsDoNotMatchedProps = {
  newPassword: string,
  confirmPassword: string,
}
export const passwordsDoNotMatched = (props: PasswordsDoNotMatchedProps) =>
  !(props.newPassword === props.confirmPassword)
