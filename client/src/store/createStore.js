import { combineReducers, configureStore } from '@reduxjs/toolkit'
import articlesReducer from './articles'
import startInfoReducer from './startInfo'
import usersReducer from './users'
import commentsReducer from './comments'

const rootReducer = combineReducers({
  articles: articlesReducer,
  startInfo: startInfoReducer,
  users: usersReducer,
  comments: commentsReducer
})

export function createStore () {
  return configureStore({
    reducer: rootReducer
  })
}