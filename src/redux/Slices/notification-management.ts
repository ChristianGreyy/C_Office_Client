import { createSlice } from '@reduxjs/toolkit'

import { INotificationDetail } from '@/interfaces'
import { getAllNotificationsAction, getAllNotificationsActionNumberAction } from '../actions'
interface INotificationsState {
  notificationsNumber: number
  notifications: INotificationDetail[] | null
  notification: INotificationDetail | null
  notificationsCurrentPage: string | number
  notificationsTotalPage: string | number
  notificationsTotalItems: string | number
  selectedNotification: INotificationDetail | null

  loadings: Record<string, boolean | undefined>
}

const initialState: INotificationsState = {
  notificationsNumber: 0,
  notifications: [],
  notification: null,
  notificationsCurrentPage: 0,
  notificationsTotalPage: 0,
  notificationsTotalItems: 0,
  selectedNotification: null,
  loadings: {},
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllNotificationsAction.pending, (state) => {
      state.loadings[`getAllNotificationsActionLoading`] = true
    })
    builder.addCase(getAllNotificationsAction.fulfilled, (state, action) => {
      state.loadings[`getAllNotificationsActionLoading`] = false
      state.notifications = action.payload?.items ?? []
      state.notificationsCurrentPage = action.payload?.page ?? 0
      state.notificationsTotalPage = action.payload?.limit ?? 0
      state.notificationsTotalItems = action.payload?.total ?? 0
    })
    builder.addCase(getAllNotificationsAction.rejected, (state) => {
      state.loadings[`getAllNotificationsActionLoading`] = false
    })
    builder.addCase(getAllNotificationsActionNumberAction.pending, (state) => {
      state.loadings[`getAllNotificationsNumberActionLoading`] = true
    })
    builder.addCase(getAllNotificationsActionNumberAction.fulfilled, (state, action) => {
      state.loadings[`getAllNotificationsNumberActionLoading`] = false
      console.log('action.payload', action.payload)
      state.notificationsNumber = action.payload.unreadNumber || 0;
    })
    builder.addCase(getAllNotificationsActionNumberAction.rejected, (state) => {
      state.loadings[`getAllNotificationsNumberActionLoading`] = false
    })
  },
})

export const notificationsActions = {
  ...notificationsSlice.actions,
}

export default notificationsSlice.reducer
