const { mergeResolvers } = require('../server.utils')
const userResolvers = require('./user/user.resolver')
const studentResolvers = require('./student/student.resolver')
const tokenResolvers = require('./token/token.resolver')
const assessmentResolvers = require('./assessment/assessment.resolver')
const alphabetAssessmentResolvers = require('./assessment/alphabet/alphabet.resolver')

module.exports = mergeResolvers([
  studentResolvers,
  userResolvers,
  tokenResolvers,
  assessmentResolvers,
  alphabetAssessmentResolvers,
])
