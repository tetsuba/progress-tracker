import { CONFIRM_TOKEN_QUERY } from '../../../api/token/token.query';
import { REST_PASSWORD_MUTATION, SEND_PASSWORD_RESET_CONFIRMATION_MUTATION } from '../../../api/user/user.mutation';

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
      input: {
        token: 'token1234',
      },
    },
  },
  result: {
    error: [{
      name: 'token_expired',
      message: 'Token has expired',
    }]
  },
}

export const resetPasswordSuccess = {
  request: {
    query: REST_PASSWORD_MUTATION,
    variables: {
      input: {
        token: 'token1234',
        password: '1234',
      },
    },
  },
  result: {
    data: {
      resetPassword: {
        confirmation: 'New password is saved',
      },
    }
  },
}

export const passwordResetMockDataSuccess = {
  request: {
    query: SEND_PASSWORD_RESET_CONFIRMATION_MUTATION,
    variables: {
      input: {
        email: 'test@test.com',
      },
    },
  },
  result: {
    data: {
      sendPasswordResetConfirmation: {
        confirmation: 'confirmation',
      },
    }
  },
}