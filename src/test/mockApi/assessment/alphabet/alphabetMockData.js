export const alphabet = [
  { letter: 'A', value: 1 },
  { letter: 'B', value: 2 },
  { letter: 'C', value: 0 },
]

const history = [
  {alphabet: alphabet, date: 'today'},
  {alphabet: alphabet, date: 'tomorrow'},
]

const alphabetAssessment = [
  {
    studentId: 'studentId01',
    history: [...history],
    typeOfAlphabetAssessment: 'upperCase',
  },
  {
    studentId: 'studentId01',
    history: [...history],
    typeOfAlphabetAssessment: 'lowerCase',
  },
  {
    studentId: 'studentId01',
    history: [...history],
    typeOfAlphabetAssessment: 'names',
  },
  {
    studentId: 'studentId01',
    history: [...history],
    typeOfAlphabetAssessment: 'sounds',
  }
]

class AlphabetMockRequest {
  create() {
    return jest.fn()
  }

  findOne(props) {
    const assessment = alphabetAssessment.find((assessment) => {
      return assessment.studentId === props.studentId &&
        assessment.typeOfAlphabetAssessment === props.typeOfAlphabetAssessment
    })

    if (assessment) {
      return {
        ...assessment,
        save: jest.fn(),
      }
    }
    return assessment
  }
}

module.exports = {
  AlphabetMockRequest,
}