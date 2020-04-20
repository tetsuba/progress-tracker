import { VERIFY_EMAIL_MUTATION } from '../client/api/user/user.mutation';

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