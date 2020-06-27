const { errorName } = require('../../../errorHandling')
module.exports = {
  Query: {
    getAlphabetAssessment: async (_, args, context) => {
      const { Student, AlphabetAssessment } = context.models
      const { studentId, typeOfAlphabetAssessment } = args.input

      const student = await Student.findById(studentId)
      const assessment = await AlphabetAssessment.findOne({
        studentId: studentId,
        typeOfAlphabetAssessment: typeOfAlphabetAssessment,
      })

      return {
        studentName: student.firstName,
        history: assessment.history,
      }
    },
  },

  Mutation: {
    saveAlphabetAssessment: async (_, args, context) => {
      const { AlphabetAssessment, Student } = context.models
      const { studentId, alphabet, date, typeOfAlphabetAssessment } = args.input

      const student = await Student.findById(studentId)
      if (!student) {
        throw new Error(errorName.STUDENT_NOT_FOUND)
      }

      const assessment = await AlphabetAssessment.findOne({
        studentId: studentId,
        typeOfAlphabetAssessment: typeOfAlphabetAssessment,
      })

      if (!assessment) {
        throw new Error(errorName.ASSESSMENT_NOT_FOUND)
      }

      assessment.history.push({ alphabet: alphabet, date: date })
      await assessment.save()

      return {
        studentName: student.firstName,
        history: assessment.history,
      }
    },
  },
}
