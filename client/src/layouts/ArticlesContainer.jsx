import React from 'react'
import { ArticlesListPage } from '../pages/ArticlesListPage'
import { ArticlePage } from '../pages/ArticlePage'
import { useSelector } from 'react-redux'
import { getCurrentArticle } from '../store/articles'

export const ArticlesContainer = () => {
  const blog = useSelector(getCurrentArticle())
  return (
    <div className="articles">
      {blog ? (
        <ArticlePage blog={blog}/>
      ) : (
        <ArticlesListPage />
      )
      }
    </div>
  )
}