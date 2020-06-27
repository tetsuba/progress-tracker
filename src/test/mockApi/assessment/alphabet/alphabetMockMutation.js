import { alphabet } from './alphabetMockData';
import { SAVE_ALPHABET_ASSESSMENT_MUTATION } from '../../../../client/api/assessment/alphabet/alphabet.mutaion';
import { GET_ALPHABET_ASSESSMENT } from '../../../../client/api/assessment/alphabet/alphabet.query';

export const saveAlphabetAssessmentMutationSuccess = {
  request: {
    query: SAVE_ALPHABET_ASSESSMENT_MUTATION,
    variables: {
      input: {
        studentId: 'studentId01',
        date: '123456789',
        alphabet: alphabet,
        typeOfAlphabetAssessment: 'upperCase',
      },
    },
    refetchQueries: [{ query: GET_ALPHABET_ASSESSMENT }]
  },
  result: {
    data: {
      saveAlphabetAssessment: {
        studentName: 'John',
        history: [
          { date: 'today', alphabet: alphabet }
        ],
      },
    },
  },
}