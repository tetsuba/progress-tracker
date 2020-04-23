import { VERIFY_USER_EMAIL_MUTATION } from '../client/api/user/user.mutation';

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
        confirmation: 'email verified',
      },
    },
  },
}