import { combineReducers, configureStore } from '@reduxjs/toolkit'
import articlesReducer from './articles'
import startInfoReducer from './startInfo'
import commentsReducer from './comments'

const rootReducer = combineReducers({
  articles: articlesReducer,
  startInfo: startInfoReducer,
  comments: commentsReducer
})

export function createStore () {
  return configureStore({
    reducer: rootReducer
  })
}