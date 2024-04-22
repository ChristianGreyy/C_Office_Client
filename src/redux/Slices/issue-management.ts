import { createSlice } from '@reduxjs/toolkit'

import { IIssueDetail } from '@/interfaces'
import { getAllIssuesAction, getIssueByIdAction } from '../actions'
interface IIssuesState {
  issues: IIssueDetail[] | null
  issue: IIssueDetail | null
  issuesCurrentPage: string | number
  issuesTotalPage: string | number
  issuesTotalItems: string | number
  selectedIssue: IIssueDetail | null

  loadings: Record<string, boolean | undefined>
}

const initialState: IIssuesState = {
  issues: [],
  issue: null,
  issuesCurrentPage: 0,
  issuesTotalPage: 0,
  issuesTotalItems: 0,
  selectedIssue: null,
  loadings: {},
}

const issuesSlice = createSlice({
  name: 'issues',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllIssuesAction.pending, (state) => {
      state.loadings[`getAllIssuesActionLoading`] = true
    })
    builder.addCase(getAllIssuesAction.fulfilled, (state, action) => {
      state.loadings[`getAllIssuesActionLoading`] = false
      state.issues = action.payload?.items ?? []
      state.issuesCurrentPage = action.payload?.page ?? 0
      state.issuesTotalPage = action.payload?.limit ?? 0
      state.issuesTotalItems = action.payload?.total ?? 0
    })
    builder.addCase(getAllIssuesAction.rejected, (state) => {
      state.loadings[`getAllIssuesActionLoading`] = false
    })
    builder.addCase(getIssueByIdAction.pending, (state) => {
      state.loadings[`getIssueByIdAction`] = true
    })
    builder.addCase(getIssueByIdAction.fulfilled, (state, action) => {
      state.loadings[`getIssueByIdAction`] = false
      state.issue = action.payload ?? {}
    })
    builder.addCase(getIssueByIdAction.rejected, (state) => {
      state.loadings[`getCurrentIssueByProfileActionLoading`] = false
    })
  },
})

export const issuesActions = {
  ...issuesSlice.actions,
}

export default issuesSlice.reducer
