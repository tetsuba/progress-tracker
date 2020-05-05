export function getRegistrationStatus(addNewUserOptions) {
  switch (true) {
    case !!addNewUserOptions.data:
      return 'success'

    default:
      return 'register'
  }
}
