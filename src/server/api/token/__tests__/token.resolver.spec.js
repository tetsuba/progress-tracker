const { createTestServer } = require('../../../test/serverTestHelper')
const {
  CONFIRM_TOKEN_QUERY,
} = require('../../../../client/api/token/token.query')
const {
  tokenMockSuccess,
  tokenMockError,
} = require('../../../../test/mockApi/token/tokenMockData')

describe('token.resolver', () => {
  describe('@Query', () => {
    describe('confirmToken', () => {
      test('should return token confirmed', async () => {
        const ctx = {
          user: { id: 'userId1234' },
          models: {
            Token: {
              findOne: jest.fn(() => tokenMockSuccess),
            },
          },
        }
        const { query } = createTestServer(ctx)
        const res = await query({
          query: CONFIRM_TOKEN_QUERY,
          variables: { token: 'token' },
        })
        expect(res).toMatchSnapshot()
      })

      test('should return an error token expired', async () => {
        const ctx = {
          user: { id: 'userId1234' },
          models: {
            Token: {
              findOne: jest.fn(() => tokenMockError),
            },
          },
        }
        const { query } = createTestServer(ctx)
        const res = await query({
          query: CONFIRM_TOKEN_QUERY,
          variables: { token: 'token' },
        })
        expect(res).toMatchSnapshot()
      })
    })
  })
})
