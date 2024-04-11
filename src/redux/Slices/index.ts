import { AnyAction, Reducer } from '@reduxjs/toolkit'
// import Cookies from 'js-cookie'
import { combineReducers } from 'redux'

// import { COFFICE_ACCESS_TOKEN } from '@configs'
import authReducer from './auth'
export * from './auth'

const productReducer = combineReducers({
  auth: authReducer,
})
  
export type RootState = ReturnType<typeof productReducer>

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'RESET') {
    // reset state
    state = {} as RootState
    // reset local storage
    // Cookies.remove(COFFICE_ACCESS_TOKEN)
    sessionStorage.clear()
  }
  return productReducer(state, action)
}
export default rootReducer
