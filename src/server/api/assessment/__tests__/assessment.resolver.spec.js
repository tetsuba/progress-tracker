const { createTestServer } = require('../../../test/serverTestHelper')
const {
  StudentMockRequest,
} = require('../../../../test/mockApi/student/studentMockData')
const {
  AlphabetMockRequest,
} = require('../../../../test/mockApi/assessment/alphabet/alphabetMockData')
const {
  ADD_ASSESSMENT_MUTATION,
} = require('../../../../client/api/assessment/assessment.mutation')

describe('assessment.resolver', () => {
  describe('@Mutation', () => {
    describe('addAssessment', () => {
      const ctx = {
        models: {
          Student: new StudentMockRequest(),
          AlphabetAssessment: new AlphabetMockRequest(),
        },
      }

      async function addAssessmentTest(assessmentName, studentId) {
        const { mutate } = createTestServer(ctx)
        return await mutate({
          mutation: ADD_ASSESSMENT_MUTATION,
          variables: {
            input: {
              studentId: studentId,
              assessmentName: assessmentName,
            },
          },
        })
      }

      describe('Success', () => {
        describe('Add new assessment to student assessments', () => {
          const studentId = 'studentId01'
          test('should add assessment "alphabet-upperCase"', async () => {
            const res = await addAssessmentTest('alphabet-upperCase', studentId)
            expect(res).toMatchSnapshot()
          })
          test('should add assessment "alphabet-lowerCase"', async () => {
            const res = await addAssessmentTest('alphabet-lowerCase', studentId)
            expect(res).toMatchSnapshot()
          })
          test('should add assessment "alphabet-name"', async () => {
            const res = await addAssessmentTest('alphabet-name', studentId)
            expect(res).toMatchSnapshot()
          })
          test('should add assessment "alphabet-sound"', async () => {
            const res = await addAssessmentTest('alphabet-sound', studentId)
            expect(res).toMatchSnapshot()
          })
        })
      })
      describe('Error', () => {
        test('should return an error if student not found', async () => {
          const studentId = 'incorrect-student-id'
          const res = await addAssessmentTest('alphabet-lower', studentId)
          expect(res.errors).toMatchSnapshot()
        })
      })
    })
  })
})
