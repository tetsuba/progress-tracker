const alphabet = [
  { letter: 'A', value: 0 },
  { letter: 'B', value: 0 },
  { letter: 'C', value: 0 },
]

const history = [
  {alphabet: alphabet, date: 'today'},
  {alphabet: alphabet, date: 'tomorrow'},
]

const courseABC = [
  {
    studentId: 'student1',
    history: history,
  },
  {
    studentId: 'student2',
    history: history,
  }
]

class CourseABCMockMutationSuccess {
  create() {
    return jest.fn()
  }
  findOne() {
    return {...courseABC[0], save: jest.fn()}
  }
}

class CourseABCMockQuerySuccess {
  findOne() {
    return courseABC[0]
  }
}

module.exports = {
  CourseABCMockMutationSuccess,
  CourseABCMockQuerySuccess,
}