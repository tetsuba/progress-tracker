import gql from 'graphql-tag'

export const STUDENTS_QUERY = gql`
  {
    students {
      id
      firstName
      lastName
      teacherID
    }
  }
`

export const STUDENT_QUERY = gql`
  query($input: StudentIdInput!) {
    getStudent(input: $input) {
      firstName
      lastName
    }
  }
`
