const LOGIN_DETAILS = {
  VALID: {
    EMAIL: 'test@test.com',
    PASSWORD: '1234qwer',
  },
  NOT_VALID: {
    EMAIL: 'email@not-validated.com',
  },
  INVALID: {
    EMAIL: 'invalid@noDotcom', // missing dot (.com)
  },
  INCORRECT: {
    EMAIL: 'incorrect@email.com',
    PASSWORD: 'incorrectPassword',
  },
}

const FAKE_TOKENS = {
  CONFIRM: {
    ID: '5e793e384c80fc70a8783fe7',
    TOKEN: 'fake-token-confirm-123456789',
  },
  RESET: {
    ID: '5e9337f7d659ea9851bd4ba0',
    TOKEN: 'fake-token-reset-123456789',
  },
  EXPIRED: {
    ID: '',
    TOKEN: 'fake-token-expired-123456789',
  }
}

module.exports = {
  LOGIN_DETAILS,
  FAKE_TOKENS,
}

