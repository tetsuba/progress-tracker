import gql from 'graphql-tag'

export const GET_USER_DETAILS_QUERY = gql`
  {
    getUserDetails {
      firstName
      lastName
      email
    }
  }
`

export const IS_USER_SESSION_EXPIRED = gql`
  {
    isUserSessionExpired {
      success
    }
  }
`

export const VALIDATE_USER_EMAIL_QUERY = gql`
  query ValidateUserEmail($token: String!) {
    validateUserEmail(token: $token) {
      success
    }
  }
`
