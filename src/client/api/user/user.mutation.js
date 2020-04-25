import gql from 'graphql-tag'

export const VERIFY_USER_EMAIL_MUTATION = gql`
  mutation($input: UserEmailInput!) {
    verifyUserEmail(input: $input) {
      success
    }
  }
`

export const REQUEST_PASSWORD_RESET_MUTATION = gql`
  mutation($input: UserEmailInput!) {
    requestPasswordReset(input: $input) {
      success
    }
  }
`

export const LOGIN_USER_MUTATION = gql`
  mutation($input: LoginUserInput!) {
    loginUser(input: $input) {
      token
    }
  }
`

export const REGISTER_NEW_USER_MUTATION = gql`
  mutation RegisterNewUser($input: NewUserInput!) {
    registerNewUser(input: $input) {
      success
    }
  }
`

export const RESET_USER_PASSWORD_MUTATION = gql`
  mutation ResetUserPassword($input: UserPasswordInput!) {
    resetUserPassword(input: $input) {
      success
    }
  }
`

export const UPDATE_USER_DETAILS_MUTATION = gql`
  mutation UpdateUserDetails($input: UserDetailsInput!) {
    updateUserDetails(input: $input) {
      success
    }
  }
`
