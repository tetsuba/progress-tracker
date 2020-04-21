const { createTestServer } = require('../../../test/serverTestHelper')
const gql = require('graphql-tag')

const LOGIN_MUTATION = gql`
  mutation($input: LoginUserInput!) {
    userLogin(input: $input) {
      token
    }
  }
`

describe('@Mutation', () => {
  describe('userLogin', () => {
    const ctx = {
      models: {
        User: {
          findOne: jest.fn(() => ({
            id: '001',
            firstName: 'John',
            lastName: 'Doh',
            email: 'test@test.com',
            password: '1234qwer',
            isVerified: true,
          })),
        },
        Token: {
          create: jest.fn(() => ({ _userId: 123456789, token: 'token' })),
        },
      },
    }
    const mutations = {
      mutation: LOGIN_MUTATION,
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
            findOne: jest.fn(() => undefined),
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
            findOne: jest.fn(() => ({
              id: '001',
              firstName: 'John',
              lastName: 'Doh',
              email: 'test@test.com',
              password: '1234qwer',
              isVerified: false,
            })),
          },
        },
      })
      const res = await mutate(mutations)
      expect(res).toMatchSnapshot()
    })
  })
})
