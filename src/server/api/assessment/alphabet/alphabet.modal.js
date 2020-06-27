const mongoose = require('mongoose')

const AlphabetSchema = new mongoose.Schema({
  letter: {
    type: String,
  },
  value: {
    type: Number,
  },
})

const AlphabetHistorySchema = new mongoose.Schema({
  date: {
    type: String,
    default: '',
  },
  alphabet: {
    type: [AlphabetSchema],
    default: [],
  },
})

const AlphabetAssessmentSchema = new mongoose.Schema({
  studentId: {
    type: String,
  },

  typeOfAlphabetAssessment: {
    type: String,
    required: true,
  },

  history: {
    type: [AlphabetHistorySchema],
  },
})

module.exports = AlphabetAssessmentSchema
