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
  userId: {
    type: String,
    required: true,
  },
  assessments: {
    type: [String],
    default: [],
  },
})

module.exports = studentSchema
