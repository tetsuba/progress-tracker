const { getUserId, findToken } = require('./token.CRUD')
const { userVerified } = require('../user/user.CRUD')

module.exports = {
  Query: {
    confirmAccount: async (_, args, context) => {
      try {
        const userId = await getUserId(args.token)
        if (userId.message) {
          throw new Error(userId.message)
          return
        }
        const user = await userVerified(userId)
        return {
          success: 'verified',
        }
      } catch (err) {
        return err
      }
    },

    confirmToken: async (_, args, context) => {
      try {
        return await findToken(args.token)
      } catch (err) {
        return err
      }
    },
  },
}
