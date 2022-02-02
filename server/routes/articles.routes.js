const express = require('express')
const Articles = require('../models/Articles')
const router = express.Router( { mergeParams: true } )
const auth = require('../middleware/auth.middleware')

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
router
  .route('/')
  .get(async (req, res) => {
    try {
      const list = await Articles.find()
      res.status(200).send(list) // send to frontend
    } catch (e) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже'
      })
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newArticle = await Articles.create({
        ...req.body
      })
      res.status(200).send(newArticle)
    } catch (e) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже!',
        error: e
      })
    }
  })
  router.patch('/:articleId', auth, async (req, res) => {
    try {
      const { articleId } = req.params
      const updatedArticle = await Articles.findByIdAndUpdate(articleId, req.body, {new: true})
      res.send(updatedArticle)
    } catch (e) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже!'
      })
    }
  })
  router.delete('/:articleId', auth, async (req, res) => {
    try {
      const { articleId } = req.params
      const removeComment = await Articles.findById(articleId)
      await removeComment.remove()
      // return res.send(null)
      const list = await Articles.find()
      res.send(list)
    } catch (e) {
      res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже!'
    })
    }
  })

module.exports = router