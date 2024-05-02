import { createSlice } from '@reduxjs/toolkit'

import { IPositionDetail } from '@/interfaces'
import { getAllPositionsAction } from '../actions'
interface IPositionsState {
  positions: IPositionDetail[] | null
  position: IPositionDetail | null
  positionsCurrentPage: string | number
  positionsTotalPage: string | number
  positionsTotalItems: string | number
  selectedPosition: IPositionDetail | null

  loadings: Record<string, boolean | undefined>
}

const initialState: IPositionsState = {
  positions: [],
  position: null,
  positionsCurrentPage: 0,
  positionsTotalPage: 0,
  positionsTotalItems: 0,
  selectedPosition: null,
  loadings: {},
}

const positionsSlice = createSlice({
  name: 'positions',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPositionsAction.pending, (state) => {
      state.loadings[`getAllPositionsActionLoading`] = true
    })
    builder.addCase(getAllPositionsAction.fulfilled, (state, action) => {
      state.loadings[`getAllPositionsActionLoading`] = false
      state.positions = action.payload?.items ?? []
      state.positionsCurrentPage = action.payload?.page ?? 0
      state.positionsTotalPage = action.payload?.limit ?? 0
      state.positionsTotalItems = action.payload?.total ?? 0
    })
    builder.addCase(getAllPositionsAction.rejected, (state) => {
      state.loadings[`getAllPositionsActionLoading`] = false
    })
  },
})

export const positionsActions = {
  ...positionsSlice.actions,
}

export default positionsSlice.reducer
