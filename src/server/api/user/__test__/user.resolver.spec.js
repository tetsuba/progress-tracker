const { ApolloServer } = require('apollo-server')
const { createTestClient } = require('apollo-server-testing')
const typeDefs = require('../../typeDefs')
const resolvers = require('../../resolvers')

const createTestServer = (ctx) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    mockEntireSchema: false,
    mocks: true,
    context: () => ctx,
  })

  return createTestClient(server)
}

const gql = require('graphql-tag')
// const createTestServer = require('./helper')
const FEED = gql`
  {
    confirmToken {
      id
    }
  }
`
// mock mongo models
describe('queries', () => {
  test('feed', async () => {
    const { query } = createTestServer({
      user: { id: 1 },
      models: {
        Post: {
          findMany: jest.fn(() => [
            {
              id: 1,
              message: 'hello',
              createdAt: 12345839,
              likes: 20,
              views: 300,
            },
          ]),
        },
      },
    })

    const res = await query({ query: FEED })
    expect(res).toMatchSnapshot()
  })
})
