const jwt = require('jsonwebtoken')
const { FAKE_TOKENS } = require('../../test/consts')

function validateEmail(email) {
  /*eslint no-useless-escape: "off"*/
  const filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return !filter.test(email)
}

function getUserFromToken(token) {
  /* Functional tests require a fake token
   *
   * * */
  switch (token) {
    case FAKE_TOKENS.RESET.TOKEN:
      return { id: FAKE_TOKENS.RESET.ID }

    case FAKE_TOKENS.CONFIRM.TOKEN:
      return { id: FAKE_TOKENS.CONFIRM.ID }

    default:
      try {
        return jwt.verify(token, process.env.REACT_APP_JWT_AUTH_SECRET)
      } catch (e) {
        return {}
      }
  }
}

module.exports = {
  validateEmail,
  getUserFromToken,
}
