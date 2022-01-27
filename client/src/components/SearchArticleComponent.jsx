import React, { useState } from 'react'
import { setFoundArticles } from '../store/articles'
import { ComponentInput } from './common/form/TextField'
import { useDispatch } from 'react-redux'

export const SearchArticleComponent = ({ articles }) => {
  const [searchArticle, setSearchArticle] = useState('')
  const dispatch = useDispatch()
  const handlerSearchArticle = (e) => {
    setSearchArticle(e.value)
    const findArticles = []
    articles.forEach(a => {
      if (a.title.toLowerCase().indexOf(e.value.toLowerCase()) !== -1) findArticles.push(a)
    })
    dispatch(setFoundArticles(findArticles))
  }

  return (
    <ComponentInput
      label='Название статьи:'
      name='searchArticle'
      value={searchArticle}
      onChange={(e) => handlerSearchArticle(e)}
      placeholder='Поиск...'
    />
  )
}