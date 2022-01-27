const express = require('express')
const Comments = require('../models/Comments')
const router = express.Router( { mergeParams: true } )

// api/auth/signUp
router.get('/', async (req, res) => {
  try {
    const list = await Comments.find()
    res.status(200).send(list)
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже'
    })
  }
})

module.exports = router