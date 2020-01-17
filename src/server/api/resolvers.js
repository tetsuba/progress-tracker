const { mergeResolvers } = require('../server.utils');
const userResolvers = require('./user/user.resolver');
const studentResolvers = require('./student/student.resolver');

module.exports = mergeResolvers([studentResolvers, userResolvers]);
