import gql from 'graphql-tag'

export const VERIFY_EMAIL_MUTATION = gql`
  mutation($input: UserEmailInput!) {
    verifyEmail(input: $input) {
      confirmation
    }
  }
`

export const SEND_PASSWORD_RESET_CONFIRMATION_MUTATION = gql`
  mutation($input: UserEmailInput!) {
    sendPasswordResetConfirmation(input: $input) {
      confirmation
    }
  }
`

export const LOGIN_MUTATION = gql`
  mutation($input: LoginUserInput!) {
    userLogin(input: $input) {
      token
    }
  }
`

export const REGISTER_USER_MUTATION = gql`
  mutation NewUser($input: NewUserInput!) {
    newUser(input: $input) {
      success
    }
  }
`

export const REST_PASSWORD_MUTATION = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      confirmation
    }
  }
`
