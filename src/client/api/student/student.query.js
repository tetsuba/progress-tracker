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
