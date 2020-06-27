const mongoose = require('mongoose')

module.exports = {
  User: mongoose.model('user', require('./user/user.modal')),
  Token: mongoose.model('token', require('./token/token.modal')),
  Student: mongoose.model('student', require('./student/student.modal')),
  AlphabetAssessment: mongoose.model(
    'alphabetAssessment',
    require('./assessment/alphabet/alphabet.modal')
  ),
}
