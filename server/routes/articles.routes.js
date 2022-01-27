const express = require('express')
const Articles = require('../models/Articles')
const router = express.Router( { mergeParams: true } )

// api/articles
router.get('/', async (req, res) => {
  try {
    const list = await Articles.find()
    res.status(200).send(list)
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже'
    })
  }
})

module.exports = router