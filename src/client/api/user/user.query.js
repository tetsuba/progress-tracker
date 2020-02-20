import gql from 'graphql-tag';

export const GET_USER_QUERY = gql`
    {
        getUserData {
            id
            firstName
            lastName
            email

        }
    }
`;
