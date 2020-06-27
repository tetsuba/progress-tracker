import { GET_ALPHABET_ASSESSMENT } from '../../../../client/api/assessment/alphabet/alphabet.query';
import { alphabet } from './alphabetMockData';

export const getAlphabetAssessmentQuerySuccess = {
  request: {
    query: GET_ALPHABET_ASSESSMENT,
    variables: {
      input: {
        studentId: 'studentId01',
        typeOfAlphabetAssessment: 'upperCase',
      },
    },
  },
  result: {
    data: {
      getAlphabetAssessment: [
        {
          studentName: 'John',
          history: [
            { date: 'today', alphabet: alphabet }
          ],
        }
      ],
    },
  },
}