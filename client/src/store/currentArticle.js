import { createSlice } from '@reduxjs/toolkit'
import articleService from '../services/articleService'
import { toast } from 'react-toastify'

const currentArticleSlice = createSlice({
  name: 'currentArticle',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    currentArticleRequested: (state) => {
      state.isLoading = true
    },
    currentArticleReceived: (state, action) => {
      state.entities = action.payload
      state.lastFetch = Date.now()
      state.isLoading = false
    },
    currentArticleRequestFiled: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

const { reducer: currentArticleReducer, actions } = currentArticleSlice
const { currentArticleRequested, currentArticleReceived, currentArticleRequestFiled } = actions

export const loadArticle = (articleId) => async (dispatch, getState) => {
  dispatch(currentArticleRequested())
  try {
    const content = await articleService.get(articleId)
    dispatch(currentArticleReceived(content))
  } catch (error) {
    dispatch(currentArticleRequestFiled(error.message))
    toast(error.message)
  }
}

export const getcurrentArticle = () => (state) => state.currentArticle.entities
export const getcurrentArticleLoadingStatus = () => (state) => state.currentArticle.isLoading

export default currentArticleReducer