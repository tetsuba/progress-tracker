const { validateEmail } = require('../../utils/common')
const { sendMail, getEmailMailOptions } = require('../../utils/email/sendEmail')
const { errorName } = require('../../errorHandling')
const {
  createAuthToken,
  createVerificationToken,
} = require('../../utils/token')
const { passwordsDoNotMatch, authenticated } = require('../utils')

module.exports = {
  Query: {
    isUserSessionExpired: (_, args, context) => {
      const { id } = context.user

      /* Error Handling:
       * - User session expired if id does not exist
       *  */
      if (!id) {
        throw new Error(errorName.TOKEN_EXPIRED)
      }
      // TODO: investigate what should be returned
      return {
        success: 'valid',
      }
    },

    getUserDetails: authenticated(async (_, args, context) => {
      const { id } = context.user
      const { User } = context.models
      const user = await User.findById(id)

      return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }
    }),
  },

  Mutation: {
    registerNewUser: async (_, args, context) => {
      const { User, Token } = context.models
      const {
        input: { email },
      } = args
      let successMessage = ''

      /* Error Handling:
       * - Not a valid email address
       *
       *  */
      if (validateEmail(email)) {
        throw new Error(errorName.NOT_VALID_EMAIL)
      }

      /* Error Handling:
       * - Email address has been registered already
       *
       *  */
      const user = await User.findOne({ email })
      if (user) {
        throw new Error(errorName.EMAIL_ALREADY_EXIST)
      }

      const newUser = await User.create(args.input)
      const verificationToken = createVerificationToken(newUser)
      const obj = await Token.create({
        _userId: newUser._id,
        token: verificationToken,
      })

      /* ---------------------------------------------------
       * When running in a test environment:
       *  - Delete registered new user
       *  - Do not send a confirmation email
       * ---------------------------------------------------
       */
      if (process.env.REACT_APP_NODE_ENV === 'test') {
        await User.deleteOne({ email: newUser.email })
        successMessage =
          'Registering a user in a test environment wil create and delete the account and will not send an confirmation email'
      } else {
        const mailOptions = getEmailMailOptions('confirmEmail')
        await sendMail(obj.token, mailOptions)
        successMessage = 'Registration completed. Please proceed to log-in page'
      }

      return { success: successMessage }
    },

    loginUser: async (_, args, context) => {
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

      /* Create an authentication session token (12hrs):
       *  */
      const verificationToken = createAuthToken(user)
      const { token } = await Token.create({
        _userId: user._id,
        token: verificationToken,
      })

      return { token }
    },

    verifyUserEmail: async (_, args, context) => {
      const { User, Token } = context.models
      const {
        input: { email },
      } = args
      const user = await User.findOne({ email })

      /* Error Handling:
       * - User email not found
       *  */
      if (!user) {
        throw new Error(errorName.EMAIL_DOES_NOT_EXIST)
      }

      /* Error Handling:
       * - Not a valid email address
       *
       *  */
      if (validateEmail(email)) {
        throw new Error(errorName.NOT_VALID_EMAIL)
      }

      /* Error Handling:
       * - User email has been verified already
       *
       *  */
      if (user.isVerified) {
        throw new Error(errorName.EMAIL_VERIFIED)
      }

      const verificationToken = createVerificationToken(user)
      const obj = await Token.create({
        _userId: user._id,
        token: verificationToken,
      })

      /* ---------------------------------------------------
       * When running in a test environment:
       *  - Sending a confirmation email is not required
       * ---------------------------------------------------
       */
      if (process.env.REACT_APP_NODE_ENV !== 'test') {
        const mailOptions = getEmailMailOptions('confirmEmail')
        await sendMail(obj.token, mailOptions)
      }

      return {
        success: 'Please check your email and confirm by pressing on the link.',
      }
    },

    requestPasswordReset: async (_, args, context) => {
      const { User, Token } = context.models
      const {
        input: { email },
      } = args
      const user = await User.findOne({ email })

      /* Error Handling:
       * - User email not found
       *  */
      if (!user) {
        throw new Error(errorName.EMAIL_DOES_NOT_EXIST)
      }

      /* Error Handling:
       * - Not a valid email address
       *
       *  */
      if (validateEmail(email)) {
        throw new Error(errorName.NOT_VALID_EMAIL)
      }

      const verificationToken = createVerificationToken(user)
      const obj = await Token.create({
        _userId: user._id,
        token: verificationToken,
      })

      /* ---------------------------------------------------
       * When running in a test environment:
       *  - Sending a confirmation email is not required
       * ---------------------------------------------------
       */
      if (process.env.REACT_APP_NODE_ENV !== 'test') {
        const mailOptions = getEmailMailOptions('resetPassword')
        await sendMail(obj.token, mailOptions)
      }

      return {
        success:
          'Please check your email and click on the link to reset your password',
      }
    },

    resetUserPassword: async (_, args, context) => {
      const { User, Token } = context.models
      const {
        input: { password, token },
      } = args

      const { _userId } = await Token.findOne({ token })
      const user = await User.findById(_userId)
      user.password = password
      await user.save()

      /* ---------------------------------------------------
       * Test environment:
       * - Same token will be used when running tests.
       *   Do not delete
       * ---------------------------------------------------
       */
      if (process.env.REACT_APP_NODE_ENV !== 'test') {
        await Token.deleteOne({ token })
      }

      return {
        success: 'New password is saved',
      }
    },

    updateUserDetails: authenticated(async (_, args, context) => {
      const { id } = context.user
      const { User } = context.models
      const {
        input: { firstName, lastName },
      } = args

      const user = await User.findById(id)
      user.firstName = firstName
      user.lastName = lastName
      await user.save()

      // TODO: Not sure if this needs to be returned. Investigate!
      return {
        success: 'user details saved.',
      }
    }),
  },
}

// NOTES
// fieldName: (parent, args, context, info) => data;

// parent:  An object that contains the result returned from the resolver on the parent type
// args:    An object that contains the arguments passed to the field
// context: An object shared by all resolvers in a GraphQL operation. We use the context to contain per-request state such as authentication information and access our data sources.
// info:    Information about the execution state of the operation which should only be used in advanced cases
