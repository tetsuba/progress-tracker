import gql from 'graphql-tag'

export const ADD_ASSESSMENT_MUTATION = gql`
  mutation AddAssessment($input: AddAssessmentInput!) {
    addAssessment(input: $input) {
      firstName
      assessments
    }
  }
`
