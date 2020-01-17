import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
    mutation($input: LoginUserInput!) {
        userLogin(input: $input) {
            id
            firstName
            lastName
            token
            email
        }
    }
`;
