type assessmentAlphabetHistoryAlphabetType = {
  value: number,
  letter: string,
}

type assessmentAlphabetHistoryType = {
  date: string,
  alphabet: [assessmentAlphabetHistoryAlphabetType],
}

export type AssessmentAlphabetType = {
  getStudentCourseABC: {
    studentName: string,
    history: [assessmentAlphabetHistoryType],
  },
}
