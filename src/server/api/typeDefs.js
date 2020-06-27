const fs = require('fs')
const path = require('path')

const userFilePath = path.join(__dirname, './user/user.graphql')
const studentFilePath = path.join(__dirname, './student/student.graphql')
const tokenFilePath = path.join(__dirname, './token/token.graphql')
const assessmentFilePath = path.join(
  __dirname,
  './assessment/assessment.graphql'
)
const alphabetAssessmentFilePath = path.join(
  __dirname,
  './assessment/alphabet/alphabet.graphql'
)

const userTypeDefs = fs.readFileSync(userFilePath, 'utf-8')
const studentTypeDefs = fs.readFileSync(studentFilePath, 'utf-8')
const tokenTypeDefs = fs.readFileSync(tokenFilePath, 'utf-8')
const assessmentTypeDefs = fs.readFileSync(assessmentFilePath, 'utf-8')
const alphabetAssessmentTypeDefs = fs.readFileSync(
  alphabetAssessmentFilePath,
  'utf-8'
)

module.exports = [
  userTypeDefs,
  studentTypeDefs,
  tokenTypeDefs,
  alphabetAssessmentTypeDefs,
  assessmentTypeDefs,
]
