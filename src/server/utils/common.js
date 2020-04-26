const jwt = require('jsonwebtoken')

function validateEmail(email) {
  /*eslint no-useless-escape: "off"*/
  const filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return !filter.test(email)
}

function getUserFromToken(token) {
  try {
    return jwt.verify(token, process.env.REACT_APP_JWT_AUTH_SECRET)
  } catch (e) {
    return {}
  }
}

module.exports = {
  validateEmail,
  getUserFromToken,
}
