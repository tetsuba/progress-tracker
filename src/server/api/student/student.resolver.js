const {
  findAllStudents,
  createNewStudent,
  getStudentById,
} = require('./student.CRUD')

module.exports = {
  Query: {
    students: (_, args, context) => {
      console.log('context', context)
      if (context.error) return context.error
      // if (!context.user) return null;
      return findAllStudents()
    },
    getStudent: async (_, args, context) => {
      return await getStudentById(args.input)
    },
  },

  Mutation: {
    addNewStudent: async (_, args, context, info) => {
      try {
        return await createNewStudent(args.input)
      } catch (err) {
        return err
      }
    },
  },
}
