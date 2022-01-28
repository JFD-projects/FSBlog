const { Schema, model } = require('mongoose')

const schema = new Schema({
  article: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  img: {
    type: String
  },
  title: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = model('Articles', schema)