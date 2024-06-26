import { AnyAction, Reducer } from '@reduxjs/toolkit'
// import Cookies from 'js-cookie'
import { combineReducers } from 'redux'

// import { COFFICE_ACCESS_TOKEN } from '@configs'
import authReducer from './auth'
import employeeAttendanceReducer from './employee-attendance-management'
import issueReducer from './issue-management'
import levelReducer from './level-management'
import positionReducer from './position-management'
import priorityReducer from './priority-management'
import projectReducer from './project-management'
import requestReducer from './request-management'
import statusReducer from './status-management'
import toastReducer from './toast'
import trackerReducer from './tracker-management'
import universityReducer from './university-management'
import userReducer from './user-management'
import notificationReducer from './notification-management'

export * from './auth'
export * from './employee-attendance-management'
export * from './issue-management'
export * from './level-management'
export * from './position-management'
export * from './priority-management'
export * from './project-management'
export * from './request-management'
export * from './status-management'
export * from './toast'
export * from './tracker-management'
export * from './user-management'
export * from './notification-management'

const productReducer = combineReducers({
  auth: authReducer,
  toast: toastReducer,
  employeeAttendances: employeeAttendanceReducer,
  projects: projectReducer,
  issues: issueReducer,
  statuses: statusReducer,
  trackers: trackerReducer,
  priorities: priorityReducer,
  universities: universityReducer,
  positions: positionReducer,
  levels: levelReducer,
  requests: requestReducer,
  users: userReducer,
  notifications: notificationReducer,
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
