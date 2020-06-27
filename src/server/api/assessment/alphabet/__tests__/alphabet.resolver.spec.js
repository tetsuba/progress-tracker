const { createTestServer } = require('../../../../test/serverTestHelper')
const {
  SAVE_ALPHABET_ASSESSMENT_MUTATION,
} = require('../../../../../client/api/assessment/alphabet/alphabet.mutaion')
const {
  GET_ALPHABET_ASSESSMENT,
} = require('../../../../../client/api/assessment/alphabet/alphabet.query')
const {
  AlphabetMockRequest,
} = require('../../../../../test/mockApi/assessment/alphabet/alphabetMockData')
const {
  StudentMockRequest,
} = require('../../../../../test/mockApi/student/studentMockData')

describe('alphabet.resolver', () => {
  describe('@Query', () => {
    describe('getAlphabetAssessment', () => {
      const ctx = {
        models: {
          Student: new StudentMockRequest(),
          AlphabetAssessment: new AlphabetMockRequest(),
        },
      }

      async function alphabetAssessmentTest(type) {
        const { query } = createTestServer(ctx)
        return await query({
          query: GET_ALPHABET_ASSESSMENT,
          variables: {
            input: {
              studentId: 'studentId01',
              typeOfAlphabetAssessment: type,
            },
          },
        })
      }

      test('should return an upperCase alphabet assessment', async () => {
        const res = await alphabetAssessmentTest('upperCase')
        expect(res.data.getAlphabetAssessment).toMatchSnapshot()
      })

      test('should return a lowerCase alphabet assessment', async () => {
        const res = await alphabetAssessmentTest('lowerCase')
        expect(res.data.getAlphabetAssessment).toMatchSnapshot()
      })

      test('should return names alphabet assessment', async () => {
        const res = await alphabetAssessmentTest('names')
        expect(res.data.getAlphabetAssessment).toMatchSnapshot()
      })

      test('should return sounds alphabet assessment', async () => {
        const res = await alphabetAssessmentTest('sounds')
        expect(res.data.getAlphabetAssessment).toMatchSnapshot()
      })
    })
  })
  describe('@Mutation', () => {
    describe('saveAlphabetAssessment', () => {
      const ctx = {
        models: {
          Student: new StudentMockRequest(),
          AlphabetAssessment: new AlphabetMockRequest(),
        },
      }

      const alphabet = [
        { letter: 'A', value: 1 },
        { letter: 'B', value: 1 },
        { letter: 'C', value: 1 },
      ]

      const date = 'new date'

      describe('Success', () => {
        async function saveAlphabetAssessmentTest(type) {
          const { mutate } = createTestServer(ctx)
          return await mutate({
            mutation: SAVE_ALPHABET_ASSESSMENT_MUTATION,
            variables: {
              input: {
                studentId: 'studentId01',
                date: date,
                alphabet: alphabet,
                typeOfAlphabetAssessment: type,
              },
            },
          })
        }

        test('should save an upperCase alphabet assessment', async () => {
          const res = await saveAlphabetAssessmentTest('upperCase')
          expect(res.data.saveAlphabetAssessment).toMatchSnapshot()
        })

        test('should save a lowerCase alphabet assessment', async () => {
          const res = await saveAlphabetAssessmentTest('lowerCase')
          expect(res.data.saveAlphabetAssessment).toMatchSnapshot()
        })

        test('should save a names alphabet assessment', async () => {
          const res = await saveAlphabetAssessmentTest('names')
          expect(res.data.saveAlphabetAssessment).toMatchSnapshot()
        })

        test('should save a sounds alphabet assessment', async () => {
          const res = await saveAlphabetAssessmentTest('sounds')
          expect(res.data.saveAlphabetAssessment).toMatchSnapshot()
        })
      })

      describe('Error', () => {
        test('should return an error "Student not found"', async () => {
          const { mutate } = createTestServer(ctx)
          const res = await mutate({
            mutation: SAVE_ALPHABET_ASSESSMENT_MUTATION,
            variables: {
              input: {
                studentId: 'studentId_does_not_exist',
                date: date,
                alphabet: alphabet,
                typeOfAlphabetAssessment: 'upper',
              },
            },
          })
          expect(res.errors).toMatchSnapshot()
        })
        test('should return an error "Assessment not found"', async () => {
          const { mutate } = createTestServer(ctx)
          const res = await mutate({
            mutation: SAVE_ALPHABET_ASSESSMENT_MUTATION,
            variables: {
              input: {
                studentId: 'studentId01',
                date: date,
                alphabet: alphabet,
                typeOfAlphabetAssessment: 'wrong_type',
              },
            },
          })
          expect(res.errors).toMatchSnapshot()
        })
      })
    })
  })
})
