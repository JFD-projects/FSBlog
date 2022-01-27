import { createSlice, createAction } from '@reduxjs/toolkit'
import commentsService from '../services/commentsService'
import httpService from '../services/http.service'
import { toast } from 'react-toastify'

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true
    },
    commentsReceived: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    commentsCreated: (state, action) => {
      state.entities.push(action.payload.content)
    },
    commentDeleted: (state, action) => {
      state.entities = state.entities.filter(a => a.id !== action.payload)
    },
    commentsRequestFiled: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    }
  }
})

const { reducer: commentsReducer, actions } = commentsSlice
const { commentsRequested, commentsReceived, commentsRequestFiled, commentsCreated, commentDeleted } = actions

const createCommentRequested = createAction('comments/createCommentRequested')
const createCommentFailed = createAction('comments/createCommentFailed')
const deleteCommentFailed = createAction('comments/deleteCommentFailed')

export const loadCommentsList = () => async (dispatch, getState) => {
  dispatch(commentsRequested())
  try {
    const { content } = await commentsService.get()
    dispatch(commentsReceived(content))
  } catch (error) {
    dispatch(commentsRequestFiled(error.message))
    toast(error.message)
  }
}

export const createComment = (val) => async (dispatch) => {
  dispatch(createCommentRequested())
  try {
    const { data } = await httpService.put(`comments/${val.id}`, val)
    dispatch(commentsCreated(data))
  } catch (error) {
    dispatch(createCommentFailed(error.message))
    toast.error(error.message)
  }
}

export const delComment = (commentId) => async (dispatch) => {
  try {
    await httpService.delete('articles/' + commentId)
    dispatch(commentDeleted(commentId))
  } catch (error) {
    deleteCommentFailed(error.message)
    toast.error(error.message)
  }
}

export const getComments = () => (state) => state.comments.entities
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading

export default commentsReducer