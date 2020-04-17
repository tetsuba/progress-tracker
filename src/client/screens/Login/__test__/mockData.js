import {
  LOGIN_MUTATION,
  SEND_PASSWORD_RESET_CONFIRMATION_MUTATION, VERIFY_EMAIL_MUTATION,
} from '../../../api/user/user.mutation';

export const loginMockDataSuccess = {
  request: {
    query: LOGIN_MUTATION,
    variables: {
      input: {
        email: 'test@test.com',
        password: '1234',
      },
    },
  },
  result: {
    data: {
      userLogin: {
        id: '',
        firstName: '',
        lastName: '',
        token: 'token',
        email: '',
      },
    },
  },
}

export const loginMockDataErrorEmailNotVerified = {
  request: {
    query: LOGIN_MUTATION,
    variables: {
      input: {
        email: 'test@test.com',
        password: '1234',
      },
    },
  },
  result: {
    errors: [{
      name: 'email_not_verified',
      message: 'Email is not verified',
    }]
  },
}

export const verifyEmailMockDataSuccess = {
  request: {
    query: VERIFY_EMAIL_MUTATION,
    variables: {
      input: {
        email: 'test@test.com',
      },
    },
  },
  result: {
    data: {
      verifyEmail: {
        confirmation: 'confirmation',
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