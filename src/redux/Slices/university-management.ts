import { createSlice } from '@reduxjs/toolkit'

import { IUniversityDetail } from '@/interfaces'
import { getAllUniversitiesAction } from '../actions'
interface IUniversitiesState {
  universities: IUniversityDetail[] | null
  university: IUniversityDetail | null
  universitiesCurrentPage: string | number
  universitiesTotalPage: string | number
  universitiesTotalItems: string | number
  selectedUniversity: IUniversityDetail | null

  loadings: Record<string, boolean | undefined>
}

const initialState: IUniversitiesState = {
  universities: [],
  university: null,
  universitiesCurrentPage: 0,
  universitiesTotalPage: 0,
  universitiesTotalItems: 0,
  selectedUniversity: null,
  loadings: {},
}

const universitiesSlice = createSlice({
  name: 'universities',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUniversitiesAction.pending, (state) => {
      state.loadings[`getAllUniversitiesActionLoading`] = true
    })
    builder.addCase(getAllUniversitiesAction.fulfilled, (state, action) => {
      state.loadings[`getAllUniversitiesActionLoading`] = false
      state.universities = action.payload?.items ?? []
      state.universitiesCurrentPage = action.payload?.page ?? 0
      state.universitiesTotalPage = action.payload?.limit ?? 0
      state.universitiesTotalItems = action.payload?.total ?? 0
    })
    builder.addCase(getAllUniversitiesAction.rejected, (state) => {
      state.loadings[`getAllUniversitiesActionLoading`] = false
    })
  },
})

export const universitiesActions = {
  ...universitiesSlice.actions,
}

export default universitiesSlice.reducer
