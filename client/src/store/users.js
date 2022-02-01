import { createAction, createSlice } from '@reduxjs/toolkit'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import userService from '../services/userService'
import history from '../static/history'
import { generateAuthError } from '../static/generateAuthError'

const initialState = localStorageService.getAccessToken() ? {
  entities: null,
  isLoading: true,
  error: null,
  auth: { userId: localStorageService.getUserId(), email: localStorageService.getEmailUser() },
  isLoggedIn: true,
  dataLoaded: false
} : {
  entities: null,
  isLoading: false,
  error: null,
  auth: { userId: null, email: null },
  isLoggedIn: false,
  dataLoaded: false
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true
    },
    usersReceived: (state, action) => {
      state.entities = action.payload
      state.dataLoaded = true
      state.isLoading = false
    },
    usersRequestFiled: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload
      state.isLoggedIn = true
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload
    },
    userCreated: (state, action) => {
      state.entities.push(action.payload)
    },
    userUpdated: (state, action) => {
      state.entities = state.entities.map(u => {
        if (u._id === action.payload._id) return action.payload
        return u
      })
    },
    userLoggedout: (state) => {
      state.entities = null
      state.isLoggedIn = false
      state.auth = { userId: null, email: null }
      state.dataLoaded = false
    },
    authRequested: (state) => {
      state.error = null
    }
  }
})

const { reducer: usersReducer, actions } = usersSlice
const { usersRequested, usersReceived, usersRequestFiled, authRequestSuccess, authRequestFailed, userUpdated, userLoggedout } = actions

const authRequested = createAction('users/authRequested')
const userUpdateRequested = createAction('users/userUpdateRequested')
const updateUserFailed = createAction('users/updateUserFailed')

export const logIn = ({ payload, redirect }) => async (dispatch) => {
  console.log(payload)
  const { email, password } = payload
  console.log(email, password)
  dispatch(authRequested())
  try {
    const data = await authService.login({ email, password })
    localStorageService.setTokens(data)
    dispatch(authRequestSuccess({ userId: data.userId, email: data.email }))
    history.push(redirect)
  } catch (error) {
    const { code, message } = error.response.data.error
    if (code === 400) {
      const errorMessage = generateAuthError(message)
      dispatch(authRequestFailed(errorMessage))
    } else {
      dispatch(authRequestFailed(error.message))
    }
  }
}

export const signUp = (payload) => async (dispatch) => {
  dispatch(authRequested())
  try {
    const data = await authService.register(payload)
    localStorageService.setTokens(data)
    dispatch(authRequestSuccess({ userId: data.userId }))
    history.push('/auth/login')
  } catch (error) {
    dispatch(authRequestFailed(error.message))
  }
}

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData()
  dispatch(userLoggedout())
  history.push('/auth/login')
}

export const getUpdateUserData = (payload) => async (dispatch, getState) => {
  dispatch(userUpdateRequested())
  try {
    const { content } = await userService.update(payload)
    dispatch(userUpdated(content))
    history.push(`/users/${getState().users.auth.userId}`)
  } catch (error) {
    dispatch(updateUserFailed(error.message))
    console.log(error)
  }
}

export const loadUsersList = () => async (dispatch, getState) => {
  dispatch(usersRequested())
  try {
    const { content } = await userService.get()
    dispatch(usersReceived(content))
  } catch (error) {
    dispatch(usersRequestFiled(error.message))
  }
}

export const getUsersList = () => (state) => state.users.entities
export const getCurrentUserData = () => (state) => {
  return state.users.entities ? state.users.entities.find(u => u._id === state.users.auth.userId) : null
}
export const getUserById = (userId) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find(u => u._id === userId)
  }
}

export const getIsLoggedIn = () => state => state.users.isLoggedIn
export const getDataStatus = () => state => state.users.dataLoaded
export const getCurrentUserId = () => state => state.users.auth.userId
export const getCurrentUserEmail = () => state => state.users.auth.email
export const getUsersLoadingStatus = () => state => state.users.isLoading
export const getAuthError = () => state => state.users.error

export default usersReducer