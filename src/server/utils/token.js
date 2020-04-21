const jwt = require('jsonwebtoken')

function createAuthToken(user) {
  const options = { email: user.email, password: user.password }
  const secret = process.env.REACT_APP_JWT_AUTH_SECRET
  const expires = { expiresIn: '1h' }
  return jwt.sign(options, secret, expires)
}

function createVerificationToken(user) {
  const options = { user: user.id }
  const secret = process.env.REACT_APP_JWT_VERIFICATION_SECRET
  const expires = { expiresIn: '12h' }

  console.log('createVerificationToken: ', options, secret, expires, user)

  return jwt.sign(options, secret, expires)
}

module.exports = {
  createAuthToken,
  createVerificationToken,
}
