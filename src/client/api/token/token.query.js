import gql from 'graphql-tag';

export const CONFIRM_ACCOUNT_QUERY = gql`
    query Confirm($token: String!){
        confirmAccount(token: $token) {
            success
        }
    }
`;

export const RESET_PASSWORD_CONFIRMATION_QUERY = gql`
    query ConfirmPasswordReset($token: String!){
        confirmPasswordReset(token: $token) {
            userId
        }
    }
`;


