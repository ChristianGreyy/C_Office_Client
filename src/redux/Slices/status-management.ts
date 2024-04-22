import { createSlice } from '@reduxjs/toolkit'

import { IStatusDetail } from '@/interfaces'
import { getAllStatusesAction } from '../actions'
interface IStatusesState {
  statuses: IStatusDetail[] | null
  status: IStatusDetail | null
  statusesCurrentPage: string | number
  statusesTotalPage: string | number
  statusesTotalItems: string | number
  selectedStatus: IStatusDetail | null

  loadings: Record<string, boolean | undefined>
}

const initialState: IStatusesState = {
  statuses: [],
  status: null,
  statusesCurrentPage: 0,
  statusesTotalPage: 0,
  statusesTotalItems: 0,
  selectedStatus: null,
  loadings: {},
}

const statusesSlice = createSlice({
  name: 'statuses',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllStatusesAction.pending, (state) => {
      state.loadings[`getAllStatusesActionLoading`] = true
    })
    builder.addCase(getAllStatusesAction.fulfilled, (state, action) => {
      state.loadings[`getAllStatusesActionLoading`] = false
      state.statuses = action.payload?.items ?? []
      state.statusesCurrentPage = action.payload?.page ?? 0
      state.statusesTotalPage = action.payload?.limit ?? 0
      state.statusesTotalItems = action.payload?.total ?? 0
    })
    builder.addCase(getAllStatusesAction.rejected, (state) => {
      state.loadings[`getAllStatusesActionLoading`] = false
    })
  },
})

export const statusesActions = {
  ...statusesSlice.actions,
}

export default statusesSlice.reducer
