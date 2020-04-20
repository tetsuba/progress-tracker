import { CONFIRM_ACCOUNT_QUERY, CONFIRM_TOKEN_QUERY } from '../../../client/api/token/token.query';

export const confirmTokenQuerySuccess = {
  request: {
    query: CONFIRM_TOKEN_QUERY,
    variables: {
      token: 'token1234',
    },
  },
  result: {
    data: {
      confirmToken: {
        success: '',
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

export const confirmAccountQuerySuccess = {
  request: {
    query: CONFIRM_ACCOUNT_QUERY,
    variables: {
      token: 'confirmToken1234',
    },
  },
  result: {
    data: {
      confirmAccount: {
        success: 'success'
      }
    },
  },
}

export const confirmAccountQueryError = {
  request: {
    query: CONFIRM_ACCOUNT_QUERY,
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


