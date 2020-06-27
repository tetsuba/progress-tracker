
const assessments = ['Assessment', 'Assessment-1']

const students = [
  {
    firstName: 'Bob',
    lastName: 'Boo',
    userId: 'userId01',
    _id: '001',
    DOB: 'date',
    assessments: [...assessments]
  },
  {
    firstName: 'John',
    lastName: 'Doh',
    userId: 'userId02',
    _id: '002',
    DOB: 'date',
    assessments: [...assessments]
  },
  {
    firstName: 'David',
    lastName: 'Blue',
    userId: 'userId01',
    _id: 'studentId01',
    DOB: 'date',
    assessments: [...assessments]
  },
]

class StudentMockRequest {

  findOne({firstName}) {
    return students.find((student) => student.firstName === firstName)
  }

  findById(studentId) {
    // Very clever way to clone an object without using a library
    // TODO: create a utility for this cloning
    const cloneStudents = JSON.parse(JSON.stringify(students))
    const res = cloneStudents.find(({_id}) => _id === studentId)

    return res
      ? { ...res, save: jest.fn()}
      : res
  }

  find() {
    this.students = this.students ? this.students : students
    return this
  }

  where() {
    return this
  }

  in(userId) {
    this.students = this.students.filter((student) => student.userId === userId)
    return this
  }

  exec() {
    console.log(this.students)
    return this.students
  }

  create(student) {
    this.students = students
    this.students.push(student)
    return this
  }
}


module.exports = {
  StudentMockRequest,
}