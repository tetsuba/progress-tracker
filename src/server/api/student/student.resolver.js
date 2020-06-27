const { errorName } = require('../../errorHandling')

module.exports = {
  Query: {
    students: async (_, args, context) => {
      const { id } = context.user
      const { Student } = context.models
      return await Student.find().where('userId').in(id).exec()
    },
    getStudent: (_, args, context) => {
      const { Student } = context.models
      const { id } = args.input
      const res = Student.findById(id)
      if (!res) {
        throw new Error(errorName.STUDENT_NOT_FOUND)
      }
      return res
    },
  },

  Mutation: {
    addStudent: async (_, args, context, info) => {
      const { id } = context.user
      const { Student } = context.models

      // TODO: This is not practical and require to rethink what to do here
      const student = await Student.findOne({ firstName: args.input.firstName })
      if (student) {
        throw new Error(errorName.STUDENT_EXISTS)
      }

      await Student.create({
        ...args.input,
        userId: id,
      })

      return await Student.find().where('userId').in(id).exec()
    },
  },
}
