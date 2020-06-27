import gql from 'graphql-tag'

export const GET_ALPHABET_ASSESSMENT = gql`
  query($input: GetAlphabetAsessmentInput!) {
    getAlphabetAssessment(input: $input) {
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
