import { ADD_ASSESSMENT_MUTATION } from '../../../client/api/assessment/assessment.mutation'
import { STUDENT_QUERY } from '../../../client/api/student/student.query'

export const addAssessmentMutationSuccess = {
  request: {
    query: ADD_ASSESSMENT_MUTATION,
    variables: {
      input: {
        studentId: 'studentId001',
        assessmentName: 'alphabet-upperCase',
      },
    },
    refetchQueries: [{ query: STUDENT_QUERY }]
  },
  result: {
    data: {
      saveAlphabetAssessment: {
        firstName: 'John',
        assessments: ['alphabet-upperCase'],
      },
    },
  },
}