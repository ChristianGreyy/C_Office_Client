import { createSlice } from '@reduxjs/toolkit'

import { IPriorityDetail } from '@/interfaces'
import { getAllPrioritiesAction } from '../actions'
interface IPrioritiesState {
  priorities: IPriorityDetail[] | null
  priority: IPriorityDetail | null
  prioritiesCurrentPage: string | number
  prioritiesTotalPage: string | number
  prioritiesTotalItems: string | number
  selectedPriority: IPriorityDetail | null

  loadings: Record<string, boolean | undefined>
}

const initialState: IPrioritiesState = {
  priorities: [],
  priority: null,
  prioritiesCurrentPage: 0,
  prioritiesTotalPage: 0,
  prioritiesTotalItems: 0,
  selectedPriority: null,
  loadings: {},
}

const prioritiesSlice = createSlice({
  name: 'priorities',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPrioritiesAction.pending, (state) => {
      state.loadings[`getAllPrioritiesActionLoading`] = true
    })
    builder.addCase(getAllPrioritiesAction.fulfilled, (state, action) => {
      state.loadings[`getAllPrioritiesActionLoading`] = false
      state.priorities = action.payload?.items ?? []
      state.prioritiesCurrentPage = action.payload?.page ?? 0
      state.prioritiesTotalPage = action.payload?.limit ?? 0
      state.prioritiesTotalItems = action.payload?.total ?? 0
    })
    builder.addCase(getAllPrioritiesAction.rejected, (state) => {
      state.loadings[`getAllPrioritiesActionLoading`] = false
    })
  },
})

export const prioritiesActions = {
  ...prioritiesSlice.actions,
}

export default prioritiesSlice.reducer
