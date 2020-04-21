const jwt = require('jsonwebtoken')

function validateEmail(email) {
  const filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return !filter.test(email)
}

function getUserFromToken(headers) {
  try {
    return jwt.verify(
      headers.authorization,
      process.env.REACT_APP_JWT_AUTH_SECRET
    )
  } catch (e) {
    return {}
  }
}

module.exports = {
  validateEmail,
  getUserFromToken,
}
