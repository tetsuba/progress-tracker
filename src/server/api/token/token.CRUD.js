// This order can not be changed
const mongoose = require('mongoose')
require('./token.modal')
const Token = mongoose.model('token')
// -----------------------------

const { errorName } = require('../../../server/errorHandling')
const { createVerificationToken } = require('../../utils/token')

async function createToken(user) {
  try {
    const verificationToken = createVerificationToken(user)
    return await Token.create({ _userId: user._id, token: verificationToken })
  } catch (err) {
    return err
  }
}

async function findToken(token) {
  try {
    const confirm = await Token.findOne({ token })
    if (!confirm) {
      throw new Error(errorName.TOKEN_EXPIRED)
    }
    return { success: 'token confirmed' }
  } catch (err) {
    return err
  }
}

async function deleteToken(token) {
  try {
    return await Token.deleteOne({ token })
  } catch (err) {
    return err
  }
}

async function getUserId(token) {
  try {
    const obj = await Token.findOne({ token })
    return obj._userId
  } catch (err) {
    return new Error(errorName.TOKEN_EXPIRED)
  }
}

module.exports = {
  createToken,
  getUserId,
  deleteToken,
  findToken,
}
