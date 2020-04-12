const jwt = require('jsonwebtoken')

function createAuthToken(user) {
  const options = { user: user.email, password: user.password }
  const secret = process.env.REACT_APP_JWT_AUTH_SECRET
  const expires = { expiresIn: '1h' }
  return jwt.sign(options, secret, expires)
}

function createVerificationToken(user) {
  const options = { user: user.id }
  const secret = process.env.REACT_APP_JWT_VERIFICATION_SECRET
  const expires = { expiresIn: '12h' }
  return jwt.sign(options, secret, expires)
}

module.exports = {
  createAuthToken,
  createVerificationToken,
}
