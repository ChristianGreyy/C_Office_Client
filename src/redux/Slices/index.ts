import { AnyAction, Reducer } from '@reduxjs/toolkit'
// import Cookies from 'js-cookie'
import { combineReducers } from 'redux'

// import { COFFICE_ACCESS_TOKEN } from '@configs'
import authReducer from './auth'
import employeeAttendanceReducer from './employee-attendance-management'
import issueReducer from './issue-management'
import projectReducer from './project-mangement'
import toastReducer from './toast'

export * from './auth'
export * from './employee-attendance-management'
export * from './issue-management'
export * from './project-mangement'
export * from './toast'

const productReducer = combineReducers({
  auth: authReducer,
  toast: toastReducer,
  employeeAttendances: employeeAttendanceReducer,
  projects: projectReducer,
  issues: issueReducer,
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
