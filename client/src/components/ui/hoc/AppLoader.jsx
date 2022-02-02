import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getArticlesLoadingStatus, getOpenArticle, goArticlesListPage, goRegPage, loadArticlesList, resetFoundArticles, resetPage } from '../../../store/articles'
import { loadStartInfo } from '../../../store/startInfo'
import { loadCommentsList } from '../../../store/comments'
import { logOut } from '../../../store/users'
import { useHistory, useLocation } from 'react-router-dom'
import Loader from '../../common/Loader/Loader'
import localStorageService from '../../../services/localStorage.service'

export const AppLoader = ({ children }) => {
  const articlesStatusLoading = useSelector(getArticlesLoadingStatus())
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  console.log('--> ', localStorageService.getExpiresToken() - Date.now())
  console.log('!!!!!!!!!!!!!! ', localStorageService.getExpiresToken() < Date.now())
  if (localStorageService.getExpiresToken() !== null && localStorageService.getExpiresToken() < Date.now()) {
    dispatch(logOut())
  }

  useEffect(() => {
    checkLoadByURL()
  }, [])

  useEffect(() => {
    checkLoadByURL()
  }, [location.pathname])

  async function checkLoadByURL () {
    // if (location.pathname === '/articles' || location.pathname === '/admin') {
    if (location.pathname.match(/\/articles$/) || location.pathname.match(/\/admin$/)) {
      dispatch(goArticlesListPage())
      dispatch(resetFoundArticles())
      dispatch(resetPage())
      await dispatch(loadArticlesList())
      await dispatch(loadCommentsList())
    } else if (location.pathname.match(/\/articles\/\w/)) {
      const arrUrl = location.pathname.split('/')
      // await dispatch(loadArticlesList())
      await dispatch(loadCommentsList())
      dispatch(getOpenArticle(arrUrl[2]))
    } else if (location.pathname.match(/\/$/)) {
      dispatch(loadStartInfo())
    } else if (location.pathname.match(/\/auth\/login$/)) {
      dispatch(goRegPage())
      history.push('/auth/login')
    } else if (location.pathname.match(/\/auth\/register$/)) {
      history.push('/auth/register')
      dispatch(goRegPage())
    }
  }
  if (location.pathname === '/') return children
  if (articlesStatusLoading) return <div className="loader-container"><Loader/></div>
  return children
}