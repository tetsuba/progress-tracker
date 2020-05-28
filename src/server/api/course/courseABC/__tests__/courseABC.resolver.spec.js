const { createTestServer } = require('../../../../test/serverTestHelper')
const {
  CourseABCMockQuerySuccess,
  CourseABCMockMutationSuccess,
} = require('../../../../../test/mockApi/course/courseABC/courseABCMockData')
const {
  StudentFirstNameMockQuerySuccess,
} = require('../../../../../test/mockApi/student/studentMockData')
const {
  GET_STUDENT_COURSE_ABC,
} = require('../../../../../client/api/course/courseABC/courseABC.query')
const {
  SAVE_COURSE_PROGRESS_MUTATION,
} = require('../../../../../client/api/course/courseABC/courseABC.mutation')

describe('courseABC.resolver', () => {
  describe('@Query', () => {
    describe('getStudentCourseABC', () => {
      const ctx = {
        models: {
          Student: new StudentFirstNameMockQuerySuccess(),
          CourseABC: new CourseABCMockQuerySuccess(),
        },
      }

      test('should return course history and student name', async () => {
        const { query } = createTestServer(ctx)
        const res = await query({
          query: GET_STUDENT_COURSE_ABC,
          variables: { input: { id: 'student1' } },
        })
        expect(res).toMatchSnapshot()
      })
    })
  })
  describe('@Mutation', () => {
    describe('saveCourseProgress', () => {
      const ctx = {
        models: {
          Student: new StudentFirstNameMockQuerySuccess(),
          CourseABC: new CourseABCMockMutationSuccess(),
        },
      }

      test('should return course history and student name', async () => {
        const alphabet = [
          { letter: 'A', value: 1 },
          { letter: 'B', value: 1 },
          { letter: 'C', value: 1 },
        ]
        const date = 'today is the date'
        const { mutate } = createTestServer(ctx)
        const res = await mutate({
          mutation: SAVE_COURSE_PROGRESS_MUTATION,
          variables: {
            input: {
              id: 'student1',
              date: date,
              alphabet: alphabet,
            },
          },
        })
        expect(res).toMatchSnapshot()
      })
    })
  })
})
