
const userMockSuccess = {
  id: '001',
  firstName: 'John',
  lastName: 'Doh',
  email: 'test@test.com',
  password: '1234qwer',
  isVerified: true,
}

const userMockSuccessNotVerified = {
  ...userMockSuccess,
  isVerified: false,
}

const userMockErrorUserNotFound = undefined

module.exports = {
  userMockSuccess,
  userMockSuccessNotVerified,
  userMockErrorUserNotFound,
}