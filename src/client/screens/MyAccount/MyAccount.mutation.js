import gql from 'graphql-tag';

export const UPDATE_USER_MUTATION = gql`    
    mutation($input: UserDataInput!) {
        updateUserData(input: $input) {
            firstName
            lastName
            id
        }
    }
`
