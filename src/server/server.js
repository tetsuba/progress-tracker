const { ApolloServer, gql } = require('apollo-server');
const jwt = require('jsonwebtoken');
const { getErrorCode } = require('./errorHandling');

require('./initENV');
require('./db');

const server = new ApolloServer({
    cors: true,
    tracing: true,
    debug: true,
    typeDefs: require('./api/typeDefs'),
    resolvers: require('./api/resolvers'),
    context: ({ req }) => {
        console.log('authorization: ', req.headers.authorization);

        if (!req.headers.authorization) return null;

        try {
            // get the user token from the headers
            const token = req.headers.authorization || '';
            const payload = jwt.verify(token, process.env.REACT_APP_JWT_AUTH_SECRET);
            console.log('@@@@ payload --- ', payload);
            return payload;

        } catch(error) {
            console.log('@@@@ error --- ', error);
            return { error }
        }
    },
    formatError: (err) => {
        console.log('+ SERVER - formatError: ', err);
        return getErrorCode(err.message)
    }
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});



