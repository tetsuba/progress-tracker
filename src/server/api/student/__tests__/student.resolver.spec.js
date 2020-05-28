const {
  CourseABCMockMutationSuccess,
} = require('../../../../test/mockApi/course/courseABC/courseABCMockData')
const { createTestServer } = require('../../../test/serverTestHelper')
const {
  StudentsMockQuerySuccess,
  StudentMockQuerySuccess,
  StudentMockMutationSuccess,
} = require('../../../../test/mockApi/student/studentMockData')
const {
  ADD_STUDENT_MUTATION,
  ADD_STUDENT_STUDENT_MUTATION,
} = require('../../../../client/api/student/student.mutation')
const {
  STUDENTS_QUERY,
  STUDENT_QUERY,
} = require('../../../../client/api/student/student.query')

describe('student.resolver', () => {
  describe('@Query', () => {
    describe('students', () => {
      const ctx = {
        user: { id: 'userId1234' },
        models: {
          Student: new StudentsMockQuerySuccess(),
        },
      }

      test('should return a list of students', async () => {
        const { query } = createTestServer(ctx)
        const res = await query({
          query: STUDENTS_QUERY,
        })
        expect(res).toMatchSnapshot()
      })
    })
    describe('getStudent', () => {
      const ctx = {
        models: {
          Student: new StudentMockQuerySuccess(),
        },
      }

      test('should return a student', async () => {
        const { query } = createTestServer(ctx)
        const res = await query({
          query: STUDENT_QUERY,
          variables: {
            input: {
              id: 'id123456',
            },
          },
        })
        expect(res).toMatchSnapshot()
      })
    })
  })
  describe('@Mutation', () => {
    describe('addStudent', () => {
      const ctx = {
        user: { id: 'userId1234' },
        models: {
          Student: new StudentsMockQuerySuccess(),
        },
      }
      test('should return students', async () => {
        const { mutate } = createTestServer(ctx)
        const res = await mutate({
          mutation: ADD_STUDENT_MUTATION,
          variables: {
            input: {
              firstName: 'John',
              lastName: 'Doh',
              DOB: '123456789',
            },
          },
        })
        expect(res).toMatchSnapshot()
      })
    })
    describe('addStudentCourse', () => {
      const ctx = {
        models: {
          Student: new StudentMockMutationSuccess(),
          CourseABC: new CourseABCMockMutationSuccess(),
        },
      }
      test('should return student updated data', async () => {
        const { mutate } = createTestServer(ctx)
        const res = await mutate({
          mutation: ADD_STUDENT_STUDENT_MUTATION,
          variables: {
            input: {
              studentId: 'studentID123456',
              courseName: 'course3',
            },
          },
        })
        expect(res).toMatchSnapshot()
      })
    })
  })
})
