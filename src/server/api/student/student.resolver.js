const { errorName } = require('../../errorHandling')

module.exports = {
  Query: {
    students: async (_, args, context) => {
      const { id } = context.user
      const { Student } = context.models
      return await Student.find().where('teacherID').in(id).exec()
    },
    getStudent: (_, args, context) => {
      const { Student } = context.models
      const { id } = args.input
      return Student.findOne({ _id: id })
    },
  },

  Mutation: {
    addStudent: async (_, args, context, info) => {
      const { id } = context.user
      const { Student } = context.models
      const student = await Student.findOne({ firstName: args.input.firstName })

      // TODO: This is not practical and require to rethink what to do here
      if (student) {
        throw new Error(errorName.STUDENT_EXISTS)
      }

      await Student.create({
        ...args.input,
        teacherID: id,
      })

      return await Student.find().where('teacherID').in(id).exec()
    },
    addStudentCourse: async (_, args, context, info) => {
      const { Student, CourseABC } = context.models
      const { studentId, courseName } = args.input

      const student = await Student.findById(studentId)
      student.courses.push(courseName)
      await student.save()

      // TODO: check for student id does not exist before creating a new Course ABC
      await CourseABC.create({
        studentId: studentId,
      })

      return student
    },
  },
}
