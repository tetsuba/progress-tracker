const { ApolloServer, gql } = require('apollo-server')
const { getErrorCode } = require('./errorHandling')
const { getUserFromToken } = require('./utils/common')

require('./initENV')
require('./db')

const server = new ApolloServer({
  cors: true,
  tracing: true,
  debug: true,
  typeDefs: require('./api/typeDefs'),
  resolvers: require('./api/resolvers'),
  context: ({ req }) => {
    return {
      user: getUserFromToken(req.headers),
      models: require('./api/models'),
    }
  },
  formatError: (err) => {
    console.log('+ SERVER - formatError: ', err)
    return getErrorCode(err.message)
  },
})

// The `listen` method launches a web server.
server.listen(4000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
