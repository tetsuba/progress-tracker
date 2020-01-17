const jwt = require('jsonwebtoken');

function mergeResolvers(resolvers) {
    const Query = resolvers.reduce((acc, val) => Object.assign(acc, val.Query), {})
    const Mutation = resolvers.reduce((acc, val) => Object.assign(acc, val.Mutation), {})
    return { Query, Mutation }
}

function createToken(user) {
    const options = {user: user.email, password: user.password}
    const secret = process.env.REACT_APP_JWT_SECRET;
    const expires = { expiresIn: '1h' };
    return jwt.sign(options, secret, expires);
}

module.exports = {
    mergeResolvers,
    createToken
};
