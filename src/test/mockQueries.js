import { CONFIRM_TOKEN_QUERY } from '../client/api/token/token.query';

export const confirmAccountQuerySuccess = {
  request: {
    query: CONFIRM_TOKEN_QUERY,
    variables: {
      token: 'confirmToken1234',
    },
  },
  result: {
    data: {
      confirmAccount: {
        success: 'account confirmed',
      },
    },
  },
}

export const confirmAccountQueryError = {
  request: {
    query: CONFIRM_TOKEN_QUERY,
    variables: {
      input: {
        token: 'confirmToken1234',
      }
    },
  },
  result: {
    error: [{ message: 'token expired'}],
  },
}


