import { REGISTER_USER_MUTATION } from '../../../api/user/user.mutation'

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
