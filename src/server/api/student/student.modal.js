const mongoose = require('mongoose')

// TODO: Create user schema -- No id. Is this correct?

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
})

mongoose.model('student', studentSchema)
