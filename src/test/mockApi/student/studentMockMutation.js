import { ADD_NEW_STUDENT_MUTATION } from '../../../client/api/student/student.mutation';
import { STUDENTS_QUERY } from '../../../client/api/student/student.query';

export const addNewStudentMutationSuccess = {
  request: {
    query: ADD_NEW_STUDENT_MUTATION,
    variables: {
      input: {
        firstName: 'John',
        lastName: 'Doh',
        DOB: 'date',
        teacherID: 'teacherId1234',
      },
    },
    refetchQueries: [{ query: STUDENTS_QUERY }]
  },
  result: {
    data: {
      addNewStudent: {
        success: 'student added to database',
      },
    },
  },
}

export const getStudentsQuerySuccess = {
  request: {
    query: STUDENTS_QUERY,
  },
  result: {
    data: {
      students: {
        id: '1111',
        firstName: 'John',
        lastName: 'Doh',
        teacherID: 'teacherID1234',
      },
    },
  },
}