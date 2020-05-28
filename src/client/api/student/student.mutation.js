import gql from 'graphql-tag'

export const ADD_STUDENT_MUTATION = gql`
  mutation AddStudent($input: AddStudentInput!) {
    addStudent(input: $input) {
      id
      firstName
      lastName
    }
  }
`

export const ADD_STUDENT_STUDENT_MUTATION = gql`
  mutation AddStudentCourse($input: StudentCourseInput!) {
    addStudentCourse(input: $input) {
      courses
    }
  }
`
