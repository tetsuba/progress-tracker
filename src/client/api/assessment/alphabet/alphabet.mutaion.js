import gql from 'graphql-tag'

export const SAVE_ALPHABET_ASSESSMENT_MUTATION = gql`
  mutation SaveAlphabetAssessment($input: AlphabetAssessmentInput!) {
    saveAlphabetAssessment(input: $input) {
      studentName
      history {
        date
        alphabet {
          letter
          value
        }
      }
    }
  }
`
