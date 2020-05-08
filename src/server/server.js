const path = require('path')
const mongoose = require('mongoose')
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { getErrorCode } = require('./errorHandling')
const { getUserFromToken } = require('./utils/common')

require('./initENV')

// ***********************************
// Express
// ***********************************
const app = express()

// ***********************************
// MongoDB connection
// ***********************************
mongoose.connect(process.env.REACT_APP_MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

// ***********************************
// ApolloServer
// ***********************************

const server = new ApolloServer({
  cors: true,
  tracing: true,
  debug: true,
  typeDefs: require('./api/typeDefs'),
  resolvers: require('./api/resolvers'),
  playground: process.env.REACT_APP_NODE_ENV !== 'prod',
  context: ({ req }) => {
    console.log('TOKEN: ', req.headers.authorization)
    const token = req.headers.authorization
    const user = getUserFromToken(token)
    console.log('USER: ', user)
    return {
      user: user,
      models: require('./api/models'),
    }
  },
  formatError: (err) => {
    console.log('+ SERVER - formatError: ', err)
    return getErrorCode(err.message)
  },
})

server.applyMiddleware({ app })

// ***********************************
// Setup
// ***********************************

// TODO: how to set this up?
// ------------------------------------------------------------
app.use(express.static(path.join(__dirname, '../../build')))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'))
})
// ------------------------------------------------------------

db.on('error', console.error.bind(console, 'connection error:'))

// Connect to the database before initiating the server
db.once('open', async function () {
  console.log('🚀 we are connected to mongoose!!!!')
  console.log('🚀 NODE_ENV: ', process.env.REACT_APP_NODE_ENV)
  const port = process.env.PORT || process.env.REACT_APP_SERVER_PORT || 4000

  app.listen({ port }, function () {
    console.log(`🚀  Server ready at port ${port}`)
  })
})
