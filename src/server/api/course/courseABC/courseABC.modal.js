const mongoose = require('mongoose')

const AlphabetSchema = new mongoose.Schema({
  letter: {
    type: String,
  },
  value: {
    type: Number,
  },
})

const ABCHistorySchema = new mongoose.Schema({
  date: {
    type: String,
    default: '',
  },
  alphabet: {
    type: [AlphabetSchema],
    default: [],
  },
})

const courseABCSchema = new mongoose.Schema({
  studentId: {
    type: String,
  },

  history: {
    type: [ABCHistorySchema],
  },
})

module.exports = courseABCSchema
