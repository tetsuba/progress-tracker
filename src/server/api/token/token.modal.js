const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 43200, // 12 hours
  },
})

module.exports = tokenSchema
