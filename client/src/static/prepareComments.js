import _ from 'lodash'

export function prepareComments (comments, idArticle) {
  console.log(comments, idArticle)
  const resultComments = []
  comments.forEach(c => {
    console.log(c.articleId, idArticle)
    if (c.articleId === idArticle) resultComments.push(c)
  })
  const sortedComments = _.orderBy(resultComments, ['date'], ['desc'])
  return sortedComments
}