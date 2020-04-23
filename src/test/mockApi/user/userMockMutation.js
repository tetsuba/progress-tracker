import {
  VERIFY_USER_EMAIL_MUTATION,
  LOGIN_USER_MUTATION,
  REQUEST_PASSWORD_RESET_MUTATION,
  REGISTER_NEW_USER_MUTATION,
  RESET_USER_PASSWORD_MUTATION,
} from '../../../client/api/user/user.mutation';

export const verifyUserEmailMutationSuccess = {
  request: {
    query: VERIFY_USER_EMAIL_MUTATION,
    variables: {
      input: { email: 'test@test.com' },
    },
  },
  result: {
    data: {
      verifyUserEmail: {
        success: 'email verified',
      },
    },
  },
}

export const loginMockDataSuccess = {
  request: {
    query: LOGIN_USER_MUTATION,
    variables: {
      input: {
        email: 'test@test.com',
        password: '1234',
      },
    },
  },
  result: {
    data: {
      loginUser: {
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
    query: LOGIN_USER_MUTATION,
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
    query: REGISTER_NEW_USER_MUTATION,
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
      registerNewUser: {
        success: 'success',
      },
    },
  },
}

export const resetUserPasswordSuccess = {
  request: {
    query: RESET_USER_PASSWORD_MUTATION,
    variables: {
      input: {
        token: 'confirmToken1234',
        password: '1234',
      },
    },
  },
  result: {
    data: {
      resetUserPassword: {
        success: 'New password is saved',
      },
    },
  },
}

export const passwordResetMockDataSuccess = {
  request: {
    query: REQUEST_PASSWORD_RESET_MUTATION,
    variables: {
      input: {
        email: 'test@test.com',
      },
    },
  },
  result: {
    data: {
      requestPasswordReset: {
        success: 'confirmation',
      },
    },
  },
}
