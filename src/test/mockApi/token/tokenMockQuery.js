import { CONFIRM_TOKEN_QUERY } from '../../../client/api/token/token.query';

export const confirmTokenQuerySuccess = {
  request: {
    query: CONFIRM_TOKEN_QUERY,
    variables: {
      token: 'confirmToken1234',
    },
  },
  result: {
    data: {
      confirmToken: {
        success: 'token confirmed',
      },
    },
  },
}

export const confirmTokenQueryError = {
  request: {
    query: CONFIRM_TOKEN_QUERY,
    variables: {
      token: 'token1234',
    },
  },
  result: {
    error: [{
      message: 'token expired'
    }],
  },
}
