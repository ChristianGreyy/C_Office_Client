import { createSlice } from '@reduxjs/toolkit'

import { IUserDetail } from '@/interfaces'
import { getAllUsersAction } from '../actions'
interface IUsersState {
  users: IUserDetail[] | null
  user: IUserDetail | null
  usersCurrentPage: string | number
  usersTotalPage: string | number
  usersTotalItems: string | number
  selectedUser: IUserDetail | null

  loadings: Record<string, boolean | undefined>
}

const initialState: IUsersState = {
  users: [],
  user: null,
  usersCurrentPage: 0,
  usersTotalPage: 0,
  usersTotalItems: 0,
  selectedUser: null,
  loadings: {},
}

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsersAction.pending, (state) => {
      state.loadings[`getAllUsersActionLoading`] = true
    })
    builder.addCase(getAllUsersAction.fulfilled, (state, action) => {
      state.loadings[`getAllUsersActionLoading`] = false
      state.users = action.payload?.items ?? []
      state.usersCurrentPage = action.payload?.page ?? 0
      state.usersTotalPage = action.payload?.limit ?? 0
      state.usersTotalItems = action.payload?.total ?? 0
    })
    builder.addCase(getAllUsersAction.rejected, (state) => {
      state.loadings[`getAllUsersActionLoading`] = false
    })
  },
})

export const usersActions = {
  ...usersSlice.actions,
}

export default usersSlice.reducer
