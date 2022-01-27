import React, { useContext, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getArticles, getFoundArticles, getPage, setPage } from '../store/articles'
import _ from 'lodash'
import { paginate } from '../static/paginate'

const ArticlesContext = React.createContext()

export const useArticles = () => {
  return useContext(ArticlesContext)
}

export const ArticlesProvider = ({ children }) => {
  const articles = useSelector(getArticles())
  const findArticleArr = useSelector(getFoundArticles())
  const dispatch = useDispatch()
  const [sortBy, setSortBy] = useState({ path: 'date', order: 'desc' })

  const sortedArticles = _.orderBy(findArticleArr || articles, [sortBy.path], [sortBy.order])

  const pageSize = 6
  const count = Math.ceil(sortedArticles.length / pageSize)
  const page = useSelector(getPage())
  const handleChange = (event, value) => {
    dispatch(setPage(value))
  }

  const handleSort = (item) => {
    setSortBy(item)
  }

  const articlesPaginate = paginate(sortedArticles, page, pageSize)

  return (
    <ArticlesContext.Provider value={{ articles, articlesPaginate, sortBy, handleSort, count, handleChange, page }}>
      { children }
    </ArticlesContext.Provider>
  )
}