import {
  VERIFY_EMAIL_MUTATION,
  LOGIN_MUTATION,
  SEND_PASSWORD_RESET_CONFIRMATION_MUTATION,
  REGISTER_USER_MUTATION, REST_PASSWORD_MUTATION,
} from '../../../client/api/user/user.mutation';

export const verifyEmailMutationSuccess = {
  request: {
    query: VERIFY_EMAIL_MUTATION,
    variables: {
      input: { email: 'test@test.com' },
    },
  },
  result: {
    data: {
      verifyEmail: {
        confirmation: 'email verified',
      },
    },
  },
}

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
    errors: [
      {
        name: 'email_not_verified',
        message: 'Email is not verified',
      },
    ],
  },
}

export const registerMockDataSuccess = {
  request: {
    query: REGISTER_USER_MUTATION,
    variables: {
      input: {
        firstName: 'unit',
        lastName: 'test',
        email: 'unit@test.com',
        password: '1234',
      },
    },
  },
  result: {
    data: {
      newUser: {
        success: 'success',
      },
    },
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
    },
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
    },
  },
}
