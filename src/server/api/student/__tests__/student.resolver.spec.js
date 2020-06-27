const { createTestServer } = require('../../../test/serverTestHelper')
const {
  StudentMockRequest,
} = require('../../../../test/mockApi/student/studentMockData')
const {
  ADD_STUDENT_MUTATION,
} = require('../../../../client/api/student/student.mutation')
const {
  STUDENTS_QUERY,
  STUDENT_QUERY,
} = require('../../../../client/api/student/student.query')

describe('student.resolver', () => {
  describe('@Query', () => {
    describe('students', () => {
      const ctx = {
        user: { id: 'userId01' },
        models: {
          Student: new StudentMockRequest(),
        },
      }

      test('should return a list of students', async () => {
        const { query } = createTestServer(ctx)
        const res = await query({
          query: STUDENTS_QUERY,
          variables: { inputs: { studentId: 'student01' } },
        })
        expect(res).toMatchSnapshot()
      })
    })
    describe('getStudent', () => {
      const ctx = {
        models: {
          Student: new StudentMockRequest(),
        },
      }

      test('should return a student if an id is found', async () => {
        const { query } = createTestServer(ctx)
        const res = await query({
          query: STUDENT_QUERY,
          variables: {
            input: {
              id: 'studentId01',
            },
          },
        })
        expect(res.data.getStudent).toMatchSnapshot()
      })

      test('should return an error if a student is not found', async () => {
        const { query } = createTestServer(ctx)
        const res = await query({
          query: STUDENT_QUERY,
          variables: {
            input: {
              id: 'studentId0',
            },
          },
        })
        expect(res.errors).toMatchSnapshot()
      })
    })
  })
  describe('@Mutation', () => {
    describe('addStudent', () => {
      const ctx = {
        user: { id: 'userId01' },
        models: {
          Student: new StudentMockRequest(),
        },
      }
      test('should add a student and return students data', async () => {
        const { mutate } = createTestServer(ctx)
        const res = await mutate({
          mutation: ADD_STUDENT_MUTATION,
          variables: {
            input: {
              firstName: 'Bill',
              lastName: 'Bee',
              DOB: '123456789',
            },
          },
        })
        expect(res).toMatchSnapshot()
      })

      test('should return an error if a student is found', async () => {
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
        expect(res.errors).toMatchSnapshot()
      })
    })
  })
})
