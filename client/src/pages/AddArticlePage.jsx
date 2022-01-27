import React from 'react'
import { SubTitle } from '../components/common/typografy/SubTitle'
import { AddArticleForm } from '../components/ui/AddArticleForm'

export const AddArticlePage = () => {
  return (
    <div className="add-article">
      <SubTitle>Добавление статьи</SubTitle>
      <AddArticleForm />
    </div>
  )
}