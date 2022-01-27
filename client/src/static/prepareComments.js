import _ from 'lodash'

export function prepareComments (comments, idArticle) {
  const resultComments = []
  comments.forEach(c => {
    if (Number(c.articleId) === Number(idArticle)) resultComments.push(c)
  })
  const sortedComments = _.orderBy(resultComments, ['date'], ['desc'])
  return sortedComments
}