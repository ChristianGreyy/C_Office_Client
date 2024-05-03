import { createSlice } from '@reduxjs/toolkit'

import { IRequestDetail } from '@/interfaces'
import { getAllRequestsAction } from '../actions'
interface IRequestsState {
  requests: IRequestDetail[] | null
  request: IRequestDetail | null
  requestsCurrentPage: string | number
  requestsTotalPage: string | number
  requestsTotalItems: string | number
  selectedRequest: IRequestDetail | null

  loadings: Record<string, boolean | undefined>
}

const initialState: IRequestsState = {
  requests: [],
  request: null,
  requestsCurrentPage: 0,
  requestsTotalPage: 0,
  requestsTotalItems: 0,
  selectedRequest: null,
  loadings: {},
}

const requestsSlice = createSlice({
  name: 'requests',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllRequestsAction.pending, (state) => {
      state.loadings[`getAllRequestsActionLoading`] = true
    })
    builder.addCase(getAllRequestsAction.fulfilled, (state, action) => {
      state.loadings[`getAllRequestsActionLoading`] = false
      state.requests = action.payload?.items ?? []
      state.requestsCurrentPage = action.payload?.page ?? 0
      state.requestsTotalPage = action.payload?.limit ?? 0
      state.requestsTotalItems = action.payload?.total ?? 0
    })
    builder.addCase(getAllRequestsAction.rejected, (state) => {
      state.loadings[`getAllRequestsActionLoading`] = false
    })
  },
})

export const requestsActions = {
  ...requestsSlice.actions,
}

export default requestsSlice.reducer
