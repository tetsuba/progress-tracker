import gql from 'graphql-tag'

export const GET_STUDENT_COURSE_ABC = gql`
  query($input: StudentIdInput!) {
    getStudentCourseABC(input: $input) {
      studentName
      history {
        date
        alphabet {
          value
          letter
        }
      }
    }
  }
`
