import { createSlice, createAction } from '@reduxjs/toolkit'
import articlesService from '../services/articlesService'
import currentArticleService from '../services/currentArticleservice'
import { toast } from 'react-toastify'

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
    currentArticle: null,
    isModal: false,
    foundArticles: null,
    page: 1
  },
  reducers: {
    articlesRequested: (state) => {
      state.isLoading = true
    },
    articlesReceived: (state, action) => {
      state.entities = action.payload
      state.lastFetch = Date.now()
      state.isLoading = false
    },
    articleCreated: (state, action) => {
      state.entities.push(action.payload)
    },
    articleUpdated: (state, action) => {
      state.entities = state.entities.map(a => {
        if (a._id === action.payload._id) return action.payload
        return a
      })
    },
    articleDeleted: (state, action) => {
      state.entities = action.payload
    },
    articlesRequestFiled: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    currentArticleReceived: (state, action) => {
      state.currentArticle = action.payload
      state.isLoading = false
    },
    currentArticleReseted: (state) => {
      state.currentArticle = null
    },
    regPageRequested: (state) => {
      state.isLoading = false
    },
    moduleOpened: (state) => {
      state.isModal = true
    },
    moduleClosed: (state) => {
      state.isModal = false
      state.currentArticle = null
    },
    articlesFound: (state, action) => {
      state.foundArticles = action.payload
    },
    articlesFoundCleared: (state) => {
      state.foundArticles = null
    },
    pageSelected: (state, action) => {
      state.page = action.payload
    },
    pageReseted: (state) => {
      state.page = 1
    }
  }
})

const { reducer: articlesReducer, actions } = articlesSlice
const {
  articlesRequested,
  articlesReceived,
  articlesRequestFiled,
  currentArticleReceived,
  currentArticleReseted,
  articleCreated,
  articleUpdated,
  regPageRequested,
  moduleClosed,
  moduleOpened,
  articleDeleted,
  articlesFound,
  articlesFoundCleared,
  pageSelected,
  pageReseted
} = actions

const deleteArticleFailed = createAction('articles/deleteArticleFailed')
const createArticleRequested = createAction('articles/createArticleRequested')
const createArticleFailed = createAction('articles/createArticleFailed')
const updateArticleRequested = createAction('articles/updateArticleRequested')
const updaterticleFailed = createAction('articles/updateArticleFailed')

function isOutDated (date) {
  if (Date.now() - date > 10 * 60 * 100) {
    return true
  }
  return false
}

export const goArticlesListPage = () => (dispatch) => {
  dispatch(currentArticleReseted())
}

export const goRegPage = () => (dispatch) => {
  dispatch(regPageRequested())
}

export const getOpenArticle = (articleId) => async (dispatch) => {
  console.log('Open art: ', articleId)
  dispatch(articlesRequested())
  try {
    const { data } = await currentArticleService.get(articleId)
    const { content } = data
    dispatch(currentArticleReceived(content))
  } catch (error) {
    dispatch(articlesRequestFiled(error.message))
    toast(error.message)
  }
}

export const loadArticlesList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().articles
  if (isOutDated(lastFetch)) {
    dispatch(articlesRequested())
    try {
      const { content } = await articlesService.get()
      dispatch(articlesReceived(content))
    } catch (error) {
      dispatch(articlesRequestFiled(error.message))
      toast(error.message)
    }
  }
}

export const createArticle = (val, handleSnackbar) => async (dispatch) => {
  console.log('try to create article: ', val)
  dispatch(createArticleRequested())
  try {
    const { content } = await articlesService.post(val)
    dispatch(moduleClosed())
    dispatch(articleCreated(content))
    handleSnackbar()
  } catch (error) {
    dispatch(createArticleFailed(error.message))
    toast.error(error.message)
  }
}

export const updateArticle = (val, handleSnackbar) => async (dispatch) => {
  dispatch(updateArticleRequested())
  try {
    const { content } = await articlesService.update(val)
    console.log(content)
    dispatch(moduleClosed())
    dispatch(articleUpdated(content))
    handleSnackbar()
  } catch (error) {
    dispatch(updaterticleFailed(error.message))
    toast.error(error.message)
  }
}

export const delArticle = (articleId, handleSnackbar) => async (dispatch) => {
  try {
    const { content } = await articlesService.delete(articleId)
    dispatch(articleDeleted(content))
    handleSnackbar()
  } catch (error) {
    deleteArticleFailed(error.message)
    toast.error(error.message)
  }
}
export const editArticle = (articleId) => (dispatch) => {
  console.log('!!!!EDIT Article!!!: ', articleId)
  dispatch(getOpenArticle(articleId))
  dispatch(moduleOpened())
  // dispatch(currentArticleReceived(articleId))
}

export const setOpenModal = () => (dispatch) => {
  dispatch(moduleOpened())
}

export const setCloseModal = () => (dispatch) => {
  dispatch(moduleClosed())
}

export const setFoundArticles = (articles) => (dispatch) => {
  dispatch(articlesFound(articles))
}

export const resetFoundArticles = () => (dispatch) => {
  dispatch(articlesFoundCleared())
}

export const setPage = (page) => (dispatch) => {
  dispatch(pageSelected(page))
}

export const resetPage = () => (dispatch) => {
  dispatch(pageReseted())
}

export const getArticles = () => (state) => state.articles.entities
export const getArticlesLoadingStatus = () => (state) => state.articles.isLoading
export const getCurrentArticle = () => (state) => state.articles.currentArticle
export const getIsModal = () => (state) => state.articles.isModal
export const getFoundArticles = () => (state) => state.articles.foundArticles
export const getPage = () => (state) => state.articles.page

export default articlesReducer