import gql from 'graphql-tag';

export const CONFIRM_ACCOUNT_QUERY = gql`
    query Confirm($token: String!){
        confirmAccount(token: $token) {
            success
        }
    }
`;
