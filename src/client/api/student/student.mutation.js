import gql from 'graphql-tag'

export const ADD_NEW_STUDENT_MUTATION = gql`
  mutation addNewStudent($input: NewStudentInput!) {
    addNewStudent(input: $input) {
      success
    }
  }
`
