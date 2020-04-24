const path = require('path')
const { ApolloServer, gql } = require('apollo-server-express')
const express = require('express')
const { getErrorCode } = require('./errorHandling')
const { getUserFromToken } = require('./utils/common')

require('./initENV')
require('./db')

const app = express()

// TODO:
// add this property to ApolloServer
// playground: NDOE_ENV !== production
// make sure playground does not run in production
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

server.applyMiddleware({ app })

// TODO: how to set this up?
app.use(express.static(path.join(__dirname, '../../build')))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'))
})

app.listen(
  {
    port: process.env.REACT_APP_PORT || 4000,
  },
  () => {
    console.log(`🚀  Server ready at ${server.graphqlPath}`)
  }
)
