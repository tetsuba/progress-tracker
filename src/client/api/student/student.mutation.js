import gql from 'graphql-tag'

export const ADD_STUDENT_MUTATION = gql`
  mutation AddStudent($input: AddStudentInput!) {
    addStudent(input: $input) {
      _id
      firstName
      lastName
    }
  }
`
