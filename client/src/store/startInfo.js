import { createSlice } from '@reduxjs/toolkit'
import { mainInfo } from '../api/fake.api/articles.api'

const startInfoSlice = createSlice({
  name: 'startInfo',
  initialState: {
    entities: null,
    isLoading: false
  },
  reducers: {
    startInfoReceived: (state, action) => {
      state.isLoading = false
      state.entities = action.payload
    }
  }
})

const { reducer: startInfoReducer, actions } = startInfoSlice
const { startInfoReceived } = actions

export const loadStartInfo = () => (dispatch) => {
  dispatch(startInfoReceived(mainInfo))
}

export const getStartInfo = () => (state) => state.startInfo.entities
export const getStartInfoLoadingStatus = () => (state) => state.startInfo.isLoading

export default startInfoReducer