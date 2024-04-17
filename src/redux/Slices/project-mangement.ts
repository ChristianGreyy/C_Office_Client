import { createSlice } from '@reduxjs/toolkit'

import { IProjectDetail } from '@/interfaces'
import { getAllProjectsAction, getCurrentProjectByProfileAction } from '../actions'
interface IProjectsState {
  projects: IProjectDetail[] | null
  project: IProjectDetail | null
  projectsCurrentPage: string | number
  projectsTotalPage: string | number
  projectsTotalItems: string | number
  selectedProject: IProjectDetail | null

  loadings: Record<string, boolean | undefined>
}

const initialState: IProjectsState = {
  projects: [],
  project: null,
  projectsCurrentPage: 0,
  projectsTotalPage: 0,
  projectsTotalItems: 0,
  selectedProject: null,
  loadings: {},
}

const projectsSlice = createSlice({
  name: 'projects',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProjectsAction.pending, (state) => {
      state.loadings[`getAllProjectsActionLoading`] = true
    })
    builder.addCase(getAllProjectsAction.fulfilled, (state, action) => {
      state.loadings[`getAllProjectsActionLoading`] = false
      state.projects = action.payload?.items ?? []
      state.projectsCurrentPage = action.payload?.page ?? 0
      state.projectsTotalPage = action.payload?.limit ?? 0
      state.projectsTotalItems = action.payload?.total ?? 0
    })
    builder.addCase(getAllProjectsAction.rejected, (state) => {
      state.loadings[`getAllProjectsActionLoading`] = false
    })
    builder.addCase(getCurrentProjectByProfileAction.pending, (state) => {
      state.loadings[`getCurrentProjectByProfileAction`] = true
    })
    builder.addCase(getCurrentProjectByProfileAction.fulfilled, (state, action) => {
      state.loadings[`getCurrentProjectByProfileAction`] = false
      state.project = action.payload ?? {}
    })
    builder.addCase(getCurrentProjectByProfileAction.rejected, (state) => {
      state.loadings[`getCurrentProjectByProfileActionLoading`] = false
    })
  },
})

export const projectsActions = {
  ...projectsSlice.actions,
}

export default projectsSlice.reducer
