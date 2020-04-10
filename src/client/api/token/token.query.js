import gql from 'graphql-tag';

export const CONFIRM_ACCOUNT_QUERY = gql`
    query Confirm($token: String!){
        confirmAccount(token: $token) {
            success
        }
    }
`;

export const CONFIRM_TOKEN_QUERY = gql`
    query ConfirmToken($token: String!){
        confirmToken(token: $token) {
            success
        }
    }
`;


