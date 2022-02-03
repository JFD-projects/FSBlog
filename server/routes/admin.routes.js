const express = require('express')
const Articles = require('../models/Articles')
const router = express.Router( { mergeParams: true } )
const auth = require('../middleware/auth.middleware')

// api/admin/:
router
  .route('/')
  .get(auth, async (req, res) => {
    try {
      const list = await Articles.find()
      res.status(200).send(list)
    } catch (e) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже'
      })
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newArticle = await Articles.create({...req.body})
      res.status(200).send(newArticle)
    } catch (e) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже!',
        error: e
      })
    }
  })
  router
    .route('/:articleId')
    .get(auth, async (req, res) => {
      try {
        const { articleId } = req.params
        const article = await Articles.findById(articleId)
        res.send(article)
    
      } catch (e) {
        res.status(500).json({
          message: 'На сервере произошла ошибка. Попробуйте позже!'
        })
      }
    })
    .put(auth, async (req, res) => {
      try {
        const { articleId } = req.params
        const editArticle = await Articles.findById(articleId)
        const updateArticle = await Articles.findByIdAndUpdate(editArticle, req.body, {new: true})
        res.send(updateArticle)
    
      } catch (e) {
        res.status(500).json({
          message: 'На сервере произошла ошибка. Попробуйте позже!'
        })
      }
    })
    .delete(auth, async (req, res) => {
      try {
        const { articleId } = req.params
        const removeArticle = await Articles.findById(articleId)
        await removeArticle.remove()
         return res.send(null)
      } catch (e) {
        res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже!'
      })
      }
    })

module.exports = router