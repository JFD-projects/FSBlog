const { Schema, model } = require('mongoose')

const schema = new Schema({
  name: {type: String},
  email: {type: String, required: true, unique: true},
  password: {type: String},
  stayOn: {type: Boolean}
}, {
  timestamps: true
})

module.exports = model('User', schema)