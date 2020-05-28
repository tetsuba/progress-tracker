import { STUDENT_QUERY, STUDENTS_QUERY } from '../../../client/api/student/student.query'

export const getStudentsQuerySuccess = {
  request: {
    query: STUDENTS_QUERY,
  },
  result: {
    data: {
      students: [
        { firstName: 'FirstName001', lastName: 'LastName001', id: 'ID001' },
        { firstName: 'FirstName002', lastName: 'LastName002', id: 'ID002' },
        { firstName: 'FirstName003', lastName: 'LastName003', id: 'ID003' },
      ],
    },
  },
}

export const getStudentQuerySuccess = {
  request: {
    query: STUDENT_QUERY,
    variables: {
      input: { id: 'studentId001'},
    },
  },
  result: {
    data: {
      getStudent: {
        firstName: 'FirstName01',
        lastName: 'LastName01',
        courses: ['course01', 'Course02', 'Course03'],
      }
    },
  },
}