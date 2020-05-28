
const students = [
  { firstName: 'Bob', lastName: 'Boo', teacherID: 'ti001', _id: '001', DOB: 'date', courses: ['Course1', 'Course2']},
  { firstName: 'John', lastName: 'Doh', teacherID: 'ti001', _id: '002', DOB: 'date', courses: ['Course1', 'Course2']}
]

class StudentsMockQuerySuccess {
  find() {
    return this
  }
  where() {
    return this
  }
  in() {
    return this
  }
  create() {
    return this
  }
  findOne() {
    return undefined
  }
  exec() {
    return students
  }
}

class StudentMockQuerySuccess {
  findOne() {
    return students[0]
  }
}

class StudentFirstNameMockQuerySuccess {
  findById() {
    return students[0]
  }
}

class StudentMockMutationSuccess {
  findById() {
    return {...students[0], save: jest.fn()}
  }
}

module.exports = {
  StudentsMockQuerySuccess,
  StudentMockQuerySuccess,
  StudentMockMutationSuccess,
  StudentFirstNameMockQuerySuccess,
}