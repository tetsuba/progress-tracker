const { mergeResolvers } = require('../server.utils')
const userResolvers = require('./user/user.resolver')
const studentResolvers = require('./student/student.resolver')
const tokenResolvers = require('./token/token.resolver')
const courseABCResolvers = require('./course/courseABC/courseABC.resolver')

module.exports = mergeResolvers([
  studentResolvers,
  userResolvers,
  tokenResolvers,
  courseABCResolvers,
])
