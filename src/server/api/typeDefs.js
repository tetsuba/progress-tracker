const fs = require('fs');
const path = require('path');

const userFilePath = path.join(__dirname, './user/user.graphql');
const studentFilePath = path.join(__dirname, './student/student.graphql');
const tokenFilePath = path.join(__dirname, './token/token.graphql');
const userTypeDefs = fs.readFileSync(userFilePath, 'utf-8');
const studentTypeDefs = fs.readFileSync(studentFilePath, 'utf-8');
const tokenTypeDefs = fs.readFileSync(tokenFilePath, 'utf-8');

module.exports = [
    userTypeDefs,
    studentTypeDefs,
    tokenTypeDefs,
];
