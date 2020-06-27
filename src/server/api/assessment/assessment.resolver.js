const { errorName } = require('../../errorHandling')

module.exports = {
  Query: {},
  Mutation: {
    addAssessment: async (_, args, context, info) => {
      const { Student, AlphabetAssessment } = context.models
      const { studentId, assessmentName } = args.input

      const student = await Student.findById(studentId)
      if (!student) {
        throw new Error(errorName.STUDENT_NOT_FOUND)
      }

      student.assessments.push(assessmentName)
      await student.save()

      switch (assessmentName.split('-')[0]) {
        case 'alphabet':
          // TODO: how to test an assessment was created?

          console.log('assessmentName:', assessmentName)
          console.log('AlphabetAssessment:', AlphabetAssessment)

          await AlphabetAssessment.create({
            studentId: studentId,
            typeOfAlphabetAssessment: assessmentName.split('-')[1],
          })
          return student

        default:
          throw new Error(errorName.ASSESSMENT_NOT_FOUND)
      }
    },
  },
}
