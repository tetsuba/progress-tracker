import gql from 'graphql-tag'

export const CONFIRM_TOKEN_QUERY = gql`
  query ConfirmToken($token: String!) {
    confirmToken(token: $token) {
      success
    }
  }
`
