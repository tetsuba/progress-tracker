const { createTestServer } = require('../../../test/serverTestHelper')
const {
  LOGIN_USER_MUTATION,
  REGISTER_NEW_USER_MUTATION,
  REQUEST_PASSWORD_RESET_MUTATION,
  VERIFY_USER_EMAIL_MUTATION,
  RESET_USER_PASSWORD_MUTATION,
  UPDATE_USER_DETAILS_MUTATION,
} = require('../../../../client/api/user/user.mutation')
const {
  GET_USER_DETAILS_QUERY,
  IS_USER_SESSION_EXPIRED,
  VALIDATE_USER_EMAIL_QUERY,
} = require('../../../../client/api/user/user.query')
const {
  userMockSuccess,
  userMockSuccessNotVerified,
  userMockErrorUserNotFound,
} = require('../../../../test/mockApi/user/userMockData')

const {
  tokenMockSuccess,
  tokenMockError,
} = require('../../../../test/mockApi/token/tokenMockData')

describe('user.resolver', () => {
  describe('@Query', () => {
    describe('getUserDetails', () => {
      const ctx = {
        user: { id: 'userId1234' },
        models: {
          User: {
            findById: jest.fn(() => userMockSuccess),
          },
        },
      }

      test('should return user details', async () => {
        const { query } = createTestServer(ctx)
        const res = await query({
          query: GET_USER_DETAILS_QUERY,
        })
        expect(res).toMatchSnapshot()
      })
      test('should return an "UNAUTHORIZED" if user is not authenticated', async () => {
        const { query } = createTestServer({
          ...ctx,
          user: {},
        })
        const res = await query({
          query: GET_USER_DETAILS_QUERY,
        })
        expect(res).toMatchSnapshot()
      })
    })
    describe('isUserSessionExpired', () => {
      test('should return a success message "Token is valid"', async () => {
        const ctx = { user: { id: 'userId' } }
        const { query } = createTestServer(ctx)
        const res = await query({
          query: IS_USER_SESSION_EXPIRED,
        })
        expect(res).toMatchSnapshot()
      })
      test('should return an error "Token expired"', async () => {
        const ctx = { user: {} }
        const { query } = createTestServer(ctx)
        const res = await query({
          query: IS_USER_SESSION_EXPIRED,
        })
        expect(res).toMatchSnapshot()
      })
    })
    describe('validateUserEmail', () => {
      test('should return a success message "Email confirmed"', async () => {
        const ctx = {
          user: { token: 'token123456' },
          models: {
            Token: {
              findOne: jest.fn(() => tokenMockSuccess),
              deleteOne: jest.fn(() => tokenMockSuccess),
            },
            User: {
              findById: jest.fn(() => ({
                ...userMockSuccess,
                save: jest.fn(() => userMockSuccess),
              })),
            },
          },
        }
        const { query } = createTestServer(ctx)
        const res = await query({
          query: VALIDATE_USER_EMAIL_QUERY,
          variables: { token: 'token123456' },
        })
        expect(res).toMatchSnapshot()
      })
      test('should return an error if token not found', async () => {
        const ctx = {
          user: { token: 'token123456' },
          models: {
            Token: {
              findOne: jest.fn(() => tokenMockError),
            },
          },
        }
        const { query } = createTestServer(ctx)
        const res = await query({
          query: VALIDATE_USER_EMAIL_QUERY,
          variables: { token: 'token123456' },
        })
        expect(res).toMatchSnapshot()
      })
    })
  })
  describe('@Mutation', () => {
    describe('registerNewUser', () => {
      const ctx = {
        models: {
          User: {
            findOne: jest.fn(() => userMockErrorUserNotFound),
            create: jest.fn(() => userMockSuccess),
            deleteOne: jest.fn(() => ({})),
          },
          Token: {
            create: jest.fn(() => tokenMockSuccess),
          },
        },
      }
      const mutations = {
        mutation: REGISTER_NEW_USER_MUTATION,
        variables: {
          input: {
            firstName: 'John',
            lastName: 'Doh',
            email: 'test1234@test.com',
            password: '1234qwer',
          },
        },
      }
      test('should register a new user returning a success message', async () => {
        const { mutate } = createTestServer(ctx)
        const res = await mutate(mutations)
        expect(res).toMatchSnapshot()
      })

      test('should return an error if email is not valid address', async () => {
        const { mutate } = createTestServer(ctx)
        const res = await mutate({
          ...mutations,
          variables: {
            input: {
              ...mutations.variables.input,
              email: 'incorrect@format-com',
            },
          },
        })
        expect(res).toMatchSnapshot()
      })

      test('should return an error in email address already exist', async () => {
        const { mutate } = createTestServer({
          ...ctx,
          models: {
            ...ctx.models,
            User: {
              ...ctx.models.User,
              findOne: jest.fn(() => userMockSuccess),
            },
          },
        })
        const res = await mutate(mutations)
        expect(res).toMatchSnapshot()
      })
    })
    describe('loginUser', () => {
      const ctx = {
        models: {
          User: {
            findOne: jest.fn(() => userMockSuccess),
          },
          Token: {
            create: jest.fn(() => tokenMockSuccess),
          },
        },
      }
      const mutations = {
        mutation: LOGIN_USER_MUTATION,
        variables: { input: { email: 'test@test.com', password: '1234qwer' } },
      }
      test('should return a token', async () => {
        const { mutate } = createTestServer(ctx)
        const res = await mutate(mutations)
        expect(res).toMatchSnapshot()
      })

      test('should return an error if a user is not found', async () => {
        const { mutate } = createTestServer({
          models: {
            ...ctx.models,
            User: {
              findOne: jest.fn(() => userMockErrorUserNotFound),
            },
          },
        })
        const res = await mutate(mutations)
        expect(res).toMatchSnapshot()
      })

      test('should return an error if passwords do not match', async () => {
        const { mutate } = createTestServer(ctx)
        const res = await mutate({
          ...mutations,
          variables: { input: { email: 'test@test.com', password: '1234' } },
        })
        expect(res).toMatchSnapshot()
      })

      test('should return an error if email is not verified', async () => {
        const { mutate } = createTestServer({
          models: {
            ...ctx.models,
            User: {
              findOne: jest.fn(() => userMockSuccessNotVerified),
            },
          },
        })
        const res = await mutate(mutations)
        expect(res).toMatchSnapshot()
      })
    })
    describe('verifyUserEmail', () => {
      const ctx = {
        models: {
          User: {
            findOne: jest.fn(() => userMockSuccessNotVerified),
          },
          Token: {
            create: jest.fn(() => tokenMockSuccess),
          },
        },
      }
      const mutations = {
        mutation: VERIFY_USER_EMAIL_MUTATION,
        variables: { input: { email: 'test@test.com' } },
      }

      test('should return a success message', async () => {
        const { mutate } = createTestServer(ctx)
        const res = await mutate(mutations)
        expect(res).toMatchSnapshot()
      })

      test('should return an error if a user email is not found', async () => {
        const { mutate } = createTestServer({
          ...ctx,
          models: {
            ...ctx.models,
            User: {
              findOne: jest.fn(() => userMockErrorUserNotFound),
            },
          },
        })
        const res = await mutate(mutations)
        expect(res).toMatchSnapshot()
      })

      test('should return an error if the users email address is not a valid format', async () => {
        const { mutate } = createTestServer(ctx)
        const res = await mutate({
          ...mutations,
          variables: { input: { email: 'test@testcom' } },
        })
        expect(res).toMatchSnapshot()
      })

      test('should return an error if a user email has been verified already', async () => {
        const { mutate } = createTestServer({
          ...ctx,
          models: {
            ...ctx.models,
            User: {
              findOne: jest.fn(() => userMockSuccess),
            },
          },
        })
        const res = await mutate(mutations)
        expect(res).toMatchSnapshot()
      })
    })
    describe('requestPasswordReset', () => {
      const ctx = {
        models: {
          User: {
            findOne: jest.fn(() => userMockSuccess),
          },
          Token: {
            create: jest.fn(() => tokenMockSuccess),
          },
        },
      }
      const mutations = {
        mutation: REQUEST_PASSWORD_RESET_MUTATION,
        variables: { input: { email: 'test@test.com' } },
      }

      test('should return a success message', async () => {
        const { mutate } = createTestServer(ctx)
        const res = await mutate(mutations)
        expect(res).toMatchSnapshot()
      })

      test('should return an error if the users email address is not found ', async () => {
        const { mutate } = createTestServer({
          ...ctx,
          models: {
            ...ctx.models,
            User: {
              findOne: jest.fn(() => userMockErrorUserNotFound),
            },
          },
        })
        const res = await mutate(mutations)
        expect(res).toMatchSnapshot()
      })

      test('should return an error if the users email address is not a valid format', async () => {
        const { mutate } = createTestServer(ctx)
        const res = await mutate({
          ...mutations,
          variables: { input: { email: 'test@testcom' } },
        })
        expect(res).toMatchSnapshot()
      })
    })
    describe('resetUserPassword', () => {
      const mutations = {
        mutation: RESET_USER_PASSWORD_MUTATION,
        variables: { input: { password: 'password', token: 'token' } },
      }

      test('should return a success message', async () => {
        const ctx = {
          models: {
            User: {
              findById: jest.fn(() => ({
                save: jest.fn(() => userMockSuccess),
              })),
            },
            Token: {
              findOne: jest.fn(() => tokenMockSuccess),
              deleteOne: jest.fn(() => 'success'),
            },
          },
        }

        const { mutate } = createTestServer(ctx)
        const res = await mutate(mutations)
        expect(res).toMatchSnapshot()
      })

      test('should return an error "Token expired"', async () => {
        const ctx = {
          models: {
            Token: {
              findOne: jest.fn(() => tokenMockError),
            },
          },
        }
        const { mutate } = createTestServer(ctx)
        const res = await mutate(mutations)
        expect(res).toMatchSnapshot()
      })
    })
    describe('updateUserDetails', () => {
      const ctx = {
        user: { id: '1234User' },
        models: {
          User: {
            findById: jest.fn(() => ({
              ...userMockSuccess,
              save: jest.fn(() => userMockSuccess),
            })),
          },
        },
      }
      const mutations = {
        mutation: UPDATE_USER_DETAILS_MUTATION,
        variables: { input: { firstName: 'John', lastName: 'Doh' } },
      }

      test('should return user details', async () => {
        const { mutate } = createTestServer(ctx)
        const res = await mutate(mutations)
        expect(res).toMatchSnapshot()
      })

      test('should return an "UNAUTHORIZED" if user is not authenticated', async () => {
        const { query } = createTestServer({
          ...ctx,
          user: {},
        })
        const res = await query({
          query: GET_USER_DETAILS_QUERY,
        })
        expect(res).toMatchSnapshot()
      })
    })
  })
})
