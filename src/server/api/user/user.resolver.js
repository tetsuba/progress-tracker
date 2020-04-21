const { validateEmail } = require('../../utils/common')

const {
  createNewUser,
  findUser,
  updateUser,
  findEmail,
  resetPassword,
} = require('./user.CRUD')
const { getEmailMailOptions } = require('../../utils/email/sendEmail.js')
const { errorName } = require('../../errorHandling')
const { createVerificationToken } = require('../../utils/token')
const { passwordsDoNotMatch } = require('../utils')

module.exports = {
  Query: {
    isUserSessionExpired: async (_, args, context) => {
      try {
        return await findUser({
          email: context.user.email,
          password: context.user.password,
        })
      } catch (e) {
        return e
      }
    },
    getUserData: async (_, args, context) => {
      console.log('@@@@@@@@@@@@ getUserData: ', context)
      try {
        return await findUser({
          email: context.user.email,
          password: context.user.password,
        })
      } catch (e) {
        return e
      }
    },
  },

  Mutation: {
    newUser: async (_, args, context, info) => {
      const name = 'confirmEmail'

      if (validateEmail(args.input.email)) {
        throw new Error(errorName.NOT_VALID_EMAIL)
      }

      try {
        const mailOptions = getEmailMailOptions(name)
        return await createNewUser(args.input, mailOptions)
      } catch (err) {
        return err
      }
    },

    userLogin: async (_, args, context, info) => {
      const { User, Token } = context.models
      const {
        input: { email, password },
      } = args
      const user = await User.findOne({ email })

      /* Error Handling:
       * - User is not found
       * - Passwords do not match
       *  */
      if (!user || passwordsDoNotMatch(password, user.password)) {
        throw new Error(errorName.INCORRECT_USER_DETAILS)
      }

      /* Error Handling:
       * - User email has not been verified
       *  */
      if (!user.isVerified) {
        throw new Error(errorName.EMAIL_NOT_VERIFIED)
      }

      /* Create a session token (12hrs):
       *  */
      const verificationToken = createVerificationToken(user)
      const { token } = await Token.create({
        _userId: user._id,
        token: verificationToken,
      })

      return { token }
    },

    updateUserData: async (_, args, context, info) => {
      try {
        return await updateUser(args.input)
      } catch (err) {
        return err
      }
    },

    verifyEmail: async (_, args, context) => {
      const name = 'confirmEmail'
      try {
        const mailOptions = getEmailMailOptions(name)
        return await findEmail({ email: args.input.email }, mailOptions)
      } catch (err) {
        if (err.name === 'TypeError') {
          console.log(
            `Property "name": "${name}" is incorrect and can not get mail options`
          )
          return new Error(errorName.INTERNAL_SERVER_ERROR)
        }
        return err
      }
    },

    sendPasswordResetConfirmation: async (_, args, context) => {
      const name = 'resetPassword'
      try {
        const mailOptions = getEmailMailOptions(name)
        return await findEmail({ email: args.input.email }, mailOptions)
      } catch (err) {
        if (err.name === 'TypeError') {
          console.log(
            `Property "name": "${name}" is incorrect and can not get mail options`
          )
          return new Error(errorName.INTERNAL_SERVER_ERROR)
        }
        return err
      }
    },

    resetPassword: async (_, args, context) => {
      try {
        return await resetPassword(args.input.token, args.input.password)
      } catch (err) {
        return err
      }
    },
  },
}

// NOTES
// fieldName: (parent, args, context, info) => data;

// parent:  An object that contains the result returned from the resolver on the parent type
// args:    An object that contains the arguments passed to the field
// context: An object shared by all resolvers in a GraphQL operation. We use the context to contain per-request state such as authentication information and access our data sources.
// info:    Information about the execution state of the operation which should only be used in advanced cases
