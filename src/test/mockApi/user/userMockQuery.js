import {
  GET_USER_DETAILS_QUERY,
  VALIDATE_USER_EMAIL_QUERY,
} from '../../../client/api/user/user.query';


export const getUserDetailsQuerySuccess = {
  request: {
    query: GET_USER_DETAILS_QUERY,
  },
  result: {
    data: {
      getUserDetails: {
        firstName: 'John',
        lastName: 'Doh',
        email: 'test@test.com',
      },
    },
  },
}

export const validateUserEmailQuerySuccess = {
  request: {
    query: VALIDATE_USER_EMAIL_QUERY,
    variables: {
      token: 'confirmToken1234',
    },
  },
  result: {
    data: {
      validateUserEmail: {
        success: 'valid',
      },
    },
  },
}

export const validateUserEmailQueryError = {
  request: {
    query: VALIDATE_USER_EMAIL_QUERY,
    variables: {
      token: 'confirmToken1234',
    },
  },
  result: {
    error: [
      {
        name: 'email_does_not_exist',
        message: 'Email does not exist',
      },
    ],
  },
}