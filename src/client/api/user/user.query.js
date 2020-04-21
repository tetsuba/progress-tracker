import gql from 'graphql-tag'

export const GET_USER_QUERY = gql`
  {
    getUserData {
      id
      firstName
      lastName
      email
    }
  }
`

export const USER_SESSION = gql`
  query($token: String) {
    isUserSessionExpired(token: $token) {
      firstName
      lastName
      id
      email
    }
  }
`
