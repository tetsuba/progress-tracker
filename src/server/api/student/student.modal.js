const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  DOB: {
    type: String,
    required: true,
  },
  teacherID: {
    type: String,
    required: true,
  },
  courses: [String],
})

module.exports = studentSchema
