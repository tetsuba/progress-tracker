import gql from 'graphql-tag'

export const UPDATE_USER_DETAILS_MUTATION = gql`
  mutation($input: UserDataInput!) {
    updateUserDetails(input: $input) {
      firstName
      lastName
      id
    }
  }
`
