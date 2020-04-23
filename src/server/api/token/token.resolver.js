const { errorName } = require('../../../server/errorHandling')

module.exports = {
  Query: {
    confirmToken: async (_, args, context) => {
      const { Token } = context.models
      const { token } = args

      const confirm = await Token.findOne({ token })
      if (!confirm) {
        throw new Error(errorName.TOKEN_EXPIRED)
      }
      return { success: 'token confirmed' }
    },
  },
}
