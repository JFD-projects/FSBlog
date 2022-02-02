const express = require('express')
const Comments = require('../models/Comments')
const router = express.Router( { mergeParams: true } )
const auth = require('../middleware/auth.middleware')

router
  .route('/')
  .get(async (req, res) => {
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
      res.status(200).send(newComment)
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
      console.log(req.user._id)
      if (removeComment.userId.toString() === req.user._id || req.user._id.toString() === '61fa329388992145ed0b173c') { // || removeComment.userId.toString() === ADMIN_id!!!
        await removeComment.remove()
        // return res.send(null)
        const list = await Comments.find()
        res.send(list)
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