type assessmentAlphabetHistoryAlphabetType = {
  value: number,
  letter: string,
}

type assessmentAlphabetHistoryType = {
  date: string,
  alphabet: [assessmentAlphabetHistoryAlphabetType],
}

export type AlphabetAssessmentType = {
  getAlphabetAssessment: {
    studentName: string,
    history: [assessmentAlphabetHistoryType],
  },
}
