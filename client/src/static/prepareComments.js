import _ from 'lodash'

export function prepareComments (comments, idArticle) {
  const resultComments = []
  comments.forEach(c => {
    if (c.articleId === idArticle) resultComments.push(c)
  })
  const sortedComments = _.orderBy(resultComments, ['date'], ['desc'])
  return sortedComments
}