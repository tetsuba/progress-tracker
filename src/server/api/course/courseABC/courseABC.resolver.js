module.exports = {
  Query: {
    getStudentCourseABC: async (_, args, context) => {
      const { Student, CourseABC } = context.models
      const { id } = args.input

      const student = await Student.findById(id)
      const course = await CourseABC.findOne({ studentId: id })

      return {
        studentName: student.firstName,
        history: course.history,
      }
    },
  },

  Mutation: {
    saveCourseProgress: async (_, args, context) => {
      const { CourseABC, Student } = context.models
      const { id, alphabet, date } = args.input

      const student = await Student.findById(id)
      const course = await CourseABC.findOne({ studentId: id })
      course.history.push({ alphabet: alphabet, date: date })
      await course.save()

      return {
        studentName: student.firstName,
        history: course.history,
      }
    },
  },
}
