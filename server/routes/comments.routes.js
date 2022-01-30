const express = require('express')
const Comments = require('../models/Comments')
const router = express.Router( { mergeParams: true } )
const auth = require('../middleware/auth.middleware')

// api/auth/signUp
router
  .route('/')
  .get(auth, async (req, res) => {
    try {
      const list = await Comments.find()
      res.send(list)
    } catch (e) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже!'
      })
    }

  })
  .post(auth, async (req, res) => {
    try {
      const newComment = await Comments.create({
        ...req.body,
        userId: req.user._id.toString(),
      })
      res.status(201).send(newComment)
    } catch (e) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже!',
        error: e
      })
    }
  })

  router.delete('/:commentId', auth, async (req, res) => {
    try {
      const { commentId } = req.params
      const removeComment = await Comments.findById(commentId)
      if (removeComment.userId.toString() === req.user._id || removeComment.userId.toString() === '61f684d91e8506482cdda475') { // || removeComment.userId.toString() === ADMIN_id!!!
        await removeComment.remove()
        return res.send(null)
      } else {
        return res.status(401).json({message: 'Unauthorized'})
      }
    } catch (e) {
      res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже!'
    })
    }
  })

module.exports = router