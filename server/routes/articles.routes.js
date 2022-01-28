const express = require('express')
const Articles = require('../models/Articles')
const router = express.Router( { mergeParams: true } )

// api/articles/:articleId:
router.get('/:articleId', async (req, res) => {
  try {
    const { articleId } = req.params

    const article = await Articles.findByIdAndUpdate(articleId, req.body, {new: true})
    res.send(article)

  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже!'
    })
  }
})
// api/articles:
router.get('/', async (req, res) => {
  try {
    const list = await Articles.find()
    res.status(200).send(list) // send to frontend
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже'
    })
  }
})

module.exports = router