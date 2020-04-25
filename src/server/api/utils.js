const { errorName } = require('../errorHandling')

function passwordsDoNotMatch(password1, password2) {
  return password1 !== password2
}

const authenticated = (next) => (root, args, context, info) => {
  if (!context.user.id) {
    throw new Error(errorName.UNAUTHORIZED)
  }
  return next(root, args, context, info)
}

module.exports = {
  passwordsDoNotMatch,
  authenticated,
}
