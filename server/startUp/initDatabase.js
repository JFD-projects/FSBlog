const Articles = require('../models/Articles')
const Comments = require('../models/Comments')
const articlesMock = require('../mock/articles.json')
const commentsMock = require('../mock/comments.json')

module.exports = async () => {
  const articles = await Articles.find()
  if (articles.length !== articlesMock.length) {
    await createInitialEntity(Articles, articlesMock)
  }
  const comments = await Comments.find()
  if (comments.length !== commentsMock.length) {
    await createInitialEntity(Comments, commentsMock)
  }
}

async function createInitialEntity (Model, data) {
  await Model.collection.drop()
  return Promise.all(
    data.map(async item => {
      try {
        delete item.id
        const newItem = new Model(item)
        await newItem.save()
        return newItem
      } catch (e) {
        return e
      }
    })
  )
}