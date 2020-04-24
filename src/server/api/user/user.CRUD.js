const { getUserId, deleteToken } = require('../token/token.CRUD')
const jwt = require('jsonwebtoken')

// This order can not be changed
const mongoose = require('mongoose')
require('./user.modal')
const User = mongoose.model('user')
// -----------------------------

const { createToken } = require('../token/token.CRUD')
const { sendMail } = require('../../utils/email/sendEmail')
const { errorName } = require('../../errorHandling')
const { createAuthToken } = require('../../utils/token')

async function findEmail(data, mailOptions) {
  try {
    const user = await User.findOne({ email: data.email })

    // ERROR - User not found
    if (!user) {
      throw new Error(errorName.EMAIL_DOES_NOT_EXIST)
    }

    // ERROR - User is verified
    if (user.isVerified && mailOptions.subject.includes('confirm')) {
      throw new Error(errorName.EMAIL_VERIFIED)
    }

    /* ---------------------------------------------------
     * Test environment:
     *  - Sending a confirmation email not required
     * ---------------------------------------------------
     */
    if (process.env.REACT_APP_NODE_ENV !== 'test') {
      const obj = await createToken(user)
      await sendMail(obj.token, mailOptions)
    }

    return {
      confirmation: 'Please check your email and confirm.',
    }
  } catch (error) {
    return error
  }
}

async function findUser(data) {
  console.log('findUser data: ', data)

  try {
    const user = await User.findOne({ email: data.email })

    console.log('findUser: ', user)

    // ERROR - User is not found or password does not match
    if (!user || user.password !== data.password) {
      throw new Error(errorName.INCORRECT_USER_DETAILS)
    }

    // ERROR - Email address not verified
    if (!user.isVerified) {
      throw new Error(errorName.EMAIL_NOT_VERIFIED)
    }

    const token = createAuthToken(user)

    // const payload = jwt.verify(token, process.env.REACT_APP_JWT_AUTH_SECRET)

    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      id: user._id,
      token,
    }
  } catch (error) {
    return error
  }
}

// RegisterUser
async function createNewUser(data, mailOptions) {
  try {
    const user = await User.findOne({ email: data.email })

    // ERROR - User is not found or password does not match
    if (user) {
      throw new Error(errorName.EMAIL_ALREADY_EXIST)
    }

    /* ---------------------------------------------------
     * Test environment:
     *  - Registering a user is not required
     *  - Sending a confirmation email is not required
     * ---------------------------------------------------
     */
    let succesMessage =
      'Registering a user in a test environment wil not create an account'
    if (process.env.REACT_APP_NODE_ENV !== 'test') {
      const newUser = await User.create(data)
      const obj = await createToken(newUser)
      await sendMail(obj.token, mailOptions)
      succesMessage = 'Registration completed. Please proceed to log-in page'
    }

    return { success: succesMessage }
  } catch (err) {
    return err
  }
}

async function updateUser(data) {
  console.log('updateUser:', data)
  try {
    const user = await User.findById(data.id)
    console.log('User:', user)
    user.firstName = data.firstName
    user.lastName = data.lastName
    return await user.save()
  } catch (e) {
    console.log('findUser error', e)
    return e
  }
}

async function userVerified(id) {
  try {
    const user = await User.findById(id)
    user.isVerified = true
    return await user.save()
  } catch (e) {
    console.log('userVerified error', e)
    return e
  }
}

async function resetUserPassword(token, password) {
  try {
    const id = await getUserId(token)
    const user = await User.findById(id)
    user.password = password
    await user.save()

    /* ---------------------------------------------------
     * Test environment:
     * - Same token will be used when running tests.
     *   Do not delete
     * ---------------------------------------------------
     */
    if (!process.env.TEST) {
      await deleteToken(token)
    }

    return {
      success: 'New password is saved',
    }
  } catch (e) {
    console.log('resetUserPassword error', e)
    return e
  }
}

module.exports = {
  findUser,
  createNewUser,
  updateUser,
  userVerified,
  findEmail,
  resetUserPassword,
}
