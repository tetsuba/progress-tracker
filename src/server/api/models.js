const mongoose = require('mongoose')

module.exports = {
  User: mongoose.model('user', require('./user/user.modal')),
  Token: mongoose.model('token', require('./token/token.modal')),
}
