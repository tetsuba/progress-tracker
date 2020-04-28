import { GET_USER_DETAILS_QUERY, IS_USER_SESSION_EXPIRED } from '../../../client/api/user/user.query';


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

export const isUserSessionExpiredQuerySuccess = {
  request: {
    query: IS_USER_SESSION_EXPIRED,
  },
  result: {
    data: {
      isUserSessionExpired: {
        success: 'valid',
      },
    },
  },
}