const { Schema, model } = require('mongoose')

const schema = new Schema({
  // articleId: {
  //   type: String,
  //   required: true
  // },
  articleId: {
    type: Schema.Types.ObjectId, 
    ref: 'Articles', 
    required: true
  },
  commentText: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
}, {
  timestamps: { createdAt: 'created_at' }
})

module.exports = model('Comments', schema)