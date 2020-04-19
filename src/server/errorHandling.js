// Useful resource to look up error codes
// https://www.restapitutorial.com/httpstatuscodes.html

const errorName = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  INCORRECT_USER_DETAILS: 'INCORRECT_USER_DETAILS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  EMAIL_DOES_NOT_EXIST: 'EMAIL_DOES_NOT_EXIST',
  EMAIL_VERIFIED: 'EMAIL_VERIFIED',
  EMAIL_NOT_VERIFIED: 'EMAIL_NOT_VERIFIED',
  EMAIL_ALREADY_EXIST: 'EMAIL_ALREADY_EXIST',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  NOT_VALID_EMAIL: 'NOT_VALID_EMAIL',
}

const errorType = {
  UNAUTHORIZED: {
    message: 'Authentication is needed to get requested response',
    statusCode: 401,
    name: 'unauthorized',
  },
  INCORRECT_USER_DETAILS: {
    message: 'You have entered incorrect username or password',
    statusCode: 403,
    name: 'incorrect_user_details',
  },
  TOKEN_EXPIRED: {
    message: 'Token has expired',
    statusCode: 410,
    name: 'token_expired',
  },
  EMAIL_DOES_NOT_EXIST: {
    message: 'Email address does not exist',
    statusCode: 404,
    name: 'email_does_not_exist',
  },
  EMAIL_VERIFIED: {
    message: 'Email verified already. Please goto login.',
    statusCode: 400, //  check to see if correct
    name: 'email_verified',
  },
  EMAIL_NOT_VERIFIED: {
    message: 'Email not verified.',
    statusCode: 401, //  unauthorized
    name: 'email_not_verified',
  },
  EMAIL_ALREADY_EXIST: {
    message: 'Email already exist',
    statusCode: 401, //  unauthorized
    name: 'email_already_exist',
  },
  INTERNAL_SERVER_ERROR: {
    message: 'Internal server error. Please try again later.',
    statusCode: 500, //  Internal server error
    name: 'Internal_server_error',
  },
  NOT_VALID_EMAIL: {
    message: 'Not a valid email address',
    statusCode: 510, //  Internal server error
    name: 'bad_email_address',
  }
}

const getErrorCode = (errorName) => {
  return errorType[errorName]
}

module.exports = {
  errorType,
  errorName,
  getErrorCode,
}
