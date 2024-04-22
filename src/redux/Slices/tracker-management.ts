import { createSlice } from '@reduxjs/toolkit'

import { ITrackerDetail } from '@/interfaces'
import { getAllTrackersAction } from '../actions'
interface ITrackersState {
  trackers: ITrackerDetail[] | null
  tracker: ITrackerDetail | null
  trackersCurrentPage: string | number
  trackersTotalPage: string | number
  trackersTotalItems: string | number
  selectedTracker: ITrackerDetail | null

  loadings: Record<string, boolean | undefined>
}

const initialState: ITrackersState = {
  trackers: [],
  tracker: null,
  trackersCurrentPage: 0,
  trackersTotalPage: 0,
  trackersTotalItems: 0,
  selectedTracker: null,
  loadings: {},
}

const trackersSlice = createSlice({
  name: 'trackers',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTrackersAction.pending, (state) => {
      state.loadings[`getAllTrackersActionLoading`] = true
    })
    builder.addCase(getAllTrackersAction.fulfilled, (state, action) => {
      state.loadings[`getAllTrackersActionLoading`] = false
      state.trackers = action.payload?.items ?? []
      state.trackersCurrentPage = action.payload?.page ?? 0
      state.trackersTotalPage = action.payload?.limit ?? 0
      state.trackersTotalItems = action.payload?.total ?? 0
    })
    builder.addCase(getAllTrackersAction.rejected, (state) => {
      state.loadings[`getAllTrackersActionLoading`] = false
    })
  },
})

export const trackersActions = {
  ...trackersSlice.actions,
}

export default trackersSlice.reducer
